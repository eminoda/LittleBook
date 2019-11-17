const Service = require('egg').Service;

class BookService extends Service {
	async findList(filter = {}, options = {}) {
		const { app, ctx, service } = this;
		const sort = {};
		sort[options.sort.field] = (options.sort.direction || 'asc').toLocaleLowerCase();
		return ctx.model.Book.find(filter)
			.sort(sort)
			.limit(options.limit)
			.skip(options.skip);
	}
	async getCount(filter = {}) {
		return this.app.model.Book.count(filter);
	}
}

module.exports = BookService;
