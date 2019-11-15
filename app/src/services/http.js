import axios from 'axios';
import qs from 'qs';
var instance = axios.create({
	baseURL: '/api',
	method: 'get',
	timeout: 1000 * 60,
	headers: {
		'X-Requested-With': 'XMLHttpRequest',
		'Content-Type': 'application/x-www-form-urlencoded'
	}
});

instance.interceptors.request.use(
	function(config) {
		if (config.method !== 'post') {
			config.params = config.data;
		} else {
			config.data = qs.stringify(config.data);
		}
		return config;
	},
	function(error) {
		return Promise.reject(error);
	}
);
instance.interceptors.response.use(
	function(response) {
		if (response.status == 200) {
			if (response.data.code == 'ok') {
				return response.data.data;
			} else {
				return Promise.reject(new Error(response.data.msg));
			}
		} else {
			return Promise.reject(new Error('服务繁忙，请稍后再试'));
		}
	},
	function(error) {
		console.log(error);
		return Promise.reject(new Error('服务异常，请稍后再试'));
	}
);

export default {
	install: function(Vue) {
		Object.defineProperty(Vue.prototype, '$http', {
			value: instance
		});
	}
};
export const $http = instance;
