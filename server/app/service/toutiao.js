const Service = require('egg').Service;
const cookie = require('cookie');
const baseURL = 'https://www.toutiao.com';
const md5 = require('md5');
class ToutiaoService extends Service {
	async fetchUserProfilePage(options = {}) {
		if (!options.userId || !options.mediaId) {
			throw new Error('请设置用户 ID');
		}
		return this.service.http.request({
			baseURL,
			url: '/c/user/' + options.userId + '/#mid=' + options.mediaId
		});
	}

	getCookie(response) {
		return response.headers['set-cookie'];
	}

	async fetchUserArticalPage(options) {
		let honey = this.service.toutiao.getHoney();
		return this.service.http.request({
			baseURL,
			headers: options.headers,
			url: '/c/user/article/',
			data: {
				page_type: 1,
				user_id: options.userId,
				max_behot_time: 0,
				count: 20,
				as: honey.as,
				cp: honey.cp
			}
		});
	}

	getHoney() {
		var e = Math.floor(new Date().getTime() / 1e3),
			i = e.toString(16).toUpperCase(),
			t = md5(e)
				.toString()
				.toUpperCase();
		if (8 != i.length)
			return {
				as: '479BB4B7254C150',
				cp: '7E0AC8874BB0985'
			};
		for (var o = t.slice(0, 5), n = t.slice(-5), s = '', a = 0; 5 > a; a++) s += o[a] + i[a];
		for (var l = '', r = 0; 5 > r; r++) l += i[r + 3] + n[r];
		return {
			as: 'A1' + s + i.slice(-3),
			cp: i.slice(0, 3) + l + 'E1'
		};
	}
}
module.exports = ToutiaoService;
