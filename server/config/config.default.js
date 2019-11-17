/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
	/**
	 * built-in config
	 * @type {Egg.EggAppConfig}
	 **/
	const config = (exports = {});

	config.mongoose = {
		client: {
			url: 'mongodb://47.103.139.109:27017/littlebook',
			options: { user: 'littlebook_rw', pass: '741852963', useNewUrlParser: true }
			// mongoose global plugins, expected a function or an array of function and options
			// plugins: [createdPlugin, [updatedPlugin, pluginOptions]]
		}
	};
	config.redis = {
		client: {
			port: 6379, // Redis port
			host: '47.103.139.109', // Redis host
			password: '',
			db: 0
		}
	};
	config.security = {
		csrf: false
	};
	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1573443289378_3080';

	// add your middleware config here
	config.middleware = ['responseWrap', 'requestQuery'];

	// add your user config here
	const userConfig = {
		// myAppName: 'egg',
	};

	return {
		...config,
		...userConfig
	};
};
