"use strict";

const Controller = require("egg").Controller;

class BookController extends Controller {
  async create() {
    const { app, ctx, service } = this;
    ctx.body = await ctx.model.Book.create(ctx.request.body);
  }
  async show() {
    const { app, ctx, service } = this;
    const id = app.mongoose.Types.ObjectId(ctx.params.id);
    ctx.body = await ctx.model.Book.findOne({ _id: id });
  }
  async index() {
    const { app, ctx, service } = this;
    const page = Number(ctx.query.page || 1);
    const pageSize = Number(ctx.query.pageSize || 10);
    const list = await service.book.findList({}, { limit: pageSize, skip: (page - 1) * pageSize });
    const totalPage = await service.book.getCount();
    ctx.body = { list, totalPage };
  }
}

module.exports = BookController;
