'use strict';

const Controller = require('egg').Controller;

class ToutiaoController extends Controller {
	async show() {
		const { app, ctx, service } = this;
		const userId = '4111809042459227',
			mediaId = '1648328783293452';
		ctx.body = await service.spider.fetchToutiaoArticle(userId, mediaId);
	}
}

module.exports = ToutiaoController;
