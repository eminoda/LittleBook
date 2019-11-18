const Service = require('egg').Service;

const axios = require('axios');
const qs = require('qs');

class HttpService extends Service {
	async request(options = {}) {
		var instance = axios.create({
			baseURL: options.baseURL || '/api',
			method: options.method || 'get',
			timeout: 1000 * 60,
			headers: {}
		});

		instance.interceptors.request.use(
			function(config) {
				if (config.method !== 'post') {
					config.params = config.data;
				} else {
					config.data = qs.stringify(config.data);
				}
				// console.log(config);
				return config;
			},
			function(error) {
				return Promise.reject(error);
			}
		);
		instance.interceptors.response.use(
			function(response) {
				if (response.status == 200) {
					return response;
				} else {
					return Promise.reject(new Error('服务繁忙，请稍后再试'));
				}
			},
			function(error) {
				console.log(error);
				return Promise.reject(new Error('服务异常，请稍后再试'));
			}
		);
		return instance.request(options);
	}
}
module.exports = HttpService;
