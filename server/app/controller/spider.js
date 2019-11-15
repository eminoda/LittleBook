"use strict";

const Controller = require("egg").Controller;

class SpiderController extends Controller {
  async page() {
    const { app, ctx, service } = this;
    let page = 1;
    while (page <= 212) {
      let pageList = await service.spider.fetchBookInfo(page);
      for (let item of pageList) {
        await ctx.model.Book.create(item);
      }
      page++;
    }
    ctx.body = page;
  }
}

module.exports = SpiderController;
