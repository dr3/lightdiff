const program = require('commander'),
	  packageJson = require('../package.json');

module.exports = function() {
	var config = {};

	program
	    .version(packageJson.version)
	    .arguments('<url1> <url2>')
	    .option('-n, --number <number>', 'The number of times both URL\'s should be run in lighthouse (default: 5)')
	    .option('-o, --one <one>', 'The title of the first URL tested')
	    .option('-t, --two <two>', 'The title of the second URL tested')
	    .option('-i, --instances <instances>', 'The number lighthouse instances used at once (default: 5)')
	    .action(function (url1, url2) {
	         config.url1 = url1;
	         config.url2 = url2;
	      })
	    .parse(process.argv);

	config.instances = program.instances || 5;
	config.iterations = program.number || 5;

	return config;
}