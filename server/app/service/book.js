const Service = require("egg").Service;

class BookService extends Service {
  async findList(filter = {}, options = {}) {
    const { app, ctx, service } = this;
    return ctx.model.Book.find(filter)
      .limit(options.limit)
      .skip(options.skip);
  }
  async getCount(filter = {}) {
    return this.app.model.Book.count(filter);
  }
}

module.exports = BookService;
