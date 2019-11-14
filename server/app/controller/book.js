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
    ctx.body = await ctx.model.Book.find({});
  }
}

module.exports = BookController;
