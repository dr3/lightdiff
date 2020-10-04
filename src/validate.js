const packageJson = require('../package.json'),
	  semver = require('semver');

module.exports = function(config){
	var safe = true;
	const number = config.number,
	 iterations = config.iterations,
	  version = packageJson.engines.node;

	if (!semver.satisfies(process.version, version)) {
	  console.log(`Required node version ${version} not satisfied with current version ${process.version}.`);
	  safe = false;
	}

	if(!config.url1 || config.url1 == '' && !config.url2 || config.url2 == ''){
		console.error('Error: url1 & url2 must be provided!');
		safe = false;
	}else if(!config.url1 || config.url1 == ''){
		console.error('Error: url1 must be provided!');
		safe = false;
	}else if(!config.url2 || config.url2 == ''){
		console.error('Error: url2 must be provided!');
		safe = false;
	}

	if(number && !/^\d+$/.test(number)){
		console.error('Error: number value must be a number!');
		safe = false;
	}

	if(iterations && !/^\d+$/.test(iterations)){
		console.error('Error: iterations value must be a number!');
		safe = false;
	}

	return safe;
}