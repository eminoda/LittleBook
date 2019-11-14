const Service = require('egg').Service;

class UtilService extends Service {
	filterValidate(filter) {
		if (filter.limit) {
			filter.limit = Number(filter.limit);
		} else {
			filter.limit = 10;
		}
		throw new Error(123);
		return filter;
	}
	/**
	 * 根据请求 field 字段，构建 sequelize 排序 order 数组
	 *
	 * { name:[1,2],age:3 } -->
	 * @param {*} fields
	 * @param {*} sort
	 */
	buildOrder(fields, sort = 'ASC') {
		let order = [];
		if (!fields) {
			return order;
		}
		sort = sort.toLocaleUpperCase();
		fields = fields instanceof Array ? fields : [fields];
		fields.forEach(element => {
			order.push([element, sort]);
		});
		return order;
	}
	getMilionChunk(rank){
		return Math.floor(rank / 1000000);
	}
}

module.exports = UtilService;
