module.exports = function (config) {
	var conf = require('./karma.common.js');
	conf.reporters.push('coveralls'); // needed for coverage results online
	config.set(conf)
};
