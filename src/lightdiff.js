const lighthouse = require('lighthouse'),
    chromeLauncher = require('chrome-launcher'),
    queue = require('async/queue'),
    cTable = require('console.table'),
    loadingSpinner = require('loading-spinner'),
    dashToTitleCase = require('./helpers/dashToTitleCase');

var allResults = [[],[]];
var runningConfig = {};

function launchChromeAndRunLighthouse(url, config = null) {
    console.log(url);


    const opts = {chromeFlags: ['--headless']};
    return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
        opts.port = chrome.port;
        return lighthouse(url, opts, config).then(results => {
            return chrome.kill().then(() => results.lhr)
        });
    });
}

module.exports = function (config){
    loadingSpinner.start(100, { clearChar: true, doNotBlock: true });

    runningConfig = config;

    const lighthouseQueue = queue((endpoint, callback) => {
        launchChromeAndRunLighthouse(endpoint.url).then(function(results) {
            allResults[endpoint.version].push(results);
            callback()
        });
    }, config.instances)

    lighthouseQueue.drain = function() {
        console.log('heheheh');

        loadingSpinner.stop();

        var table = [], arr = ['first-meaningful-paint', 'first-contentful-paint', 'speed-index', 'estimated-input-latency', 'time-to-first-byte', 
        'first-cpu-idle', 'interactive', 'mainthread-work-breakdown', 'bootup-time', 'network-requests', 'total-byte-weight', 'unused-css-rules'];

        arr.forEach( function(string) {
            var before = Math.round(allResults[0].reduce((a,c) => (c['audits'][string]['rawValue'] + a), 0) / allResults[0].length);
            var after = Math.round(allResults[1].reduce((a,c) => (c['audits'][string]['rawValue'] + a), 0) / allResults[0].length);
            var difference = -((before - after) / before * 100).toFixed(2);
            var tableData = {};

            tableData["Metric"]     = dashToTitleCase(string);
            tableData['Url 1']      = before;
            tableData['Url 2']      = after;
            tableData["Difference"] = difference > 0 ? '+' + difference + '%' : difference + '%';

            table.push(tableData);
        });

        console.log('\n');
        console.table(table);
    };

    for(var x = 0; x < config.iterations; x++){
        lighthouseQueue.push({url: config.url1, version: 0})
        lighthouseQueue.push({url: config.url2, version: 1})
    }
}
