#!/usr/bin/env node

const lighthouse = require('lighthouse'),
    chromeLauncher = require('chrome-launcher'),
    queue = require('async/queue'),
    cTable = require('console.table'),
    loadingSpinner = require('loading-spinner'),
    program = require('commander'),
    packageJson = require('./package.json');

var allResults = [[],[]];

function launchChromeAndRunLighthouse(url, config = null) {
    const opts = {chromeFlags: ['--headless']};
    return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
        opts.port = chrome.port;
        return lighthouse(url, opts, config).then(results => {
            return chrome.kill().then(() => results.lhr)
        });
    });
}

const lighthouseQueue = queue((endpoint, callback) => {
    launchChromeAndRunLighthouse(endpoint.url).then(function(results) {
        allResults[endpoint.version].push(results);
        callback()
    });
},  5)

function toTitleCase(str) {
    return str.replace(/-/g, ' ').replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

lighthouseQueue.drain = function() {
    loadingSpinner.stop();

    var table = [], arr = ['first-meaningful-paint', 'first-contentful-paint', 'speed-index', 'estimated-input-latency', 'time-to-first-byte', 
    'first-cpu-idle', 'interactive', 'mainthread-work-breakdown', 'bootup-time', 'network-requests', 'total-byte-weight', 'unused-css-rules'];

    arr.forEach( function(string) {
        var before = Math.round(allResults[0].reduce((a,c) => (c['audits'][string]['rawValue'] + a), 0) / allResults[0].length);
        var after = Math.round(allResults[1].reduce((a,c) => (c['audits'][string]['rawValue'] + a), 0) / allResults[0].length);
        var difference = ((after - before) / after * 100).toFixed(2) + '%';
        var tableData = {};

        tableData["Metric"]                = toTitleCase(string);
        tableData[program.one || 'Url 1']  = before;
        tableData[program.two || 'Url 2']  = after;
        tableData["Difference"]            = difference < 0 ? '+' + difference : difference;

        table.push(tableData);
    });

    console.log('\n');
    console.table(table);
};

function begin(url1, url2){
    loadingSpinner.start(100, { clearChar: true, hideCursor: true, doNotBlock: true });

    for(var x = 0; x < 10; x++){
        lighthouseQueue.push({url: url1, version: 0})
        lighthouseQueue.push({url: url2, version: 1})
    }
}

program
    .version(packageJson.version)
    .arguments('<url1> <url2>')
    .option('-n, --number <number>', 'The number of times both URL\'s should be run in lighthouse')
    .option('-o, --one <one>', 'The title of the first URL tested')
    .option('-t, --two <two>', 'The title of the second URL tested')
    .action(begin)
    .parse(process.argv);
