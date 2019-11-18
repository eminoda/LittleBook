'use strict';

const Controller = require('egg').Controller;

class SpiderController extends Controller {
	async page() {
		const { app, ctx, service } = this;

		ctx.body = await service.spider.getTotalBookList();
	}
}

module.exports = SpiderController;
