'use strict';

const Controller = require('egg').Controller;

class SpiderController extends Controller {
	async toutiao() {
		const { app, ctx, service } = this;
		const userId = '4111809042459227',
			mediaId = '1648328783293452';
		ctx.body = await service.spider.fetchToutiaoArticle(userId, mediaId);
	}

	async page() {
		const { app, ctx, service } = this;
		let page = 1;
		let totalPage = 201;

		let bookFetchPromise = [];
		let bookSavePromise = [];
		while (page <= totalPage) {
			bookFetchPromise.push(service.spider.fetchBookInfo(page));
			page = page + 1;
		}

		const bookFetchResult = await Promise.all(bookFetchPromise);

		for (let fetchItem of bookFetchResult) {
			let pageList = service.spider.parseBook(fetchItem);
			for (let item of pageList) {
				bookSavePromise.push(
					new Promise((resolve, reject) => {
						resolve(ctx.model.Book.create(item));
					})
				);
			}
		}
		let data = await Promise.all(bookSavePromise);
		ctx.body = data;
	}
}

module.exports = SpiderController;
