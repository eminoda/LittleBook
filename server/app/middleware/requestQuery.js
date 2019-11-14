module.exports = () => {
	return async function requestQuery(ctx, next) {
		if (ctx.method == 'GET') {
			ctx.request.queryParams = queryStringParse(ctx.querystring);
		}
		await next();
	};
};

// name=1&name=2&age=3 --> { name:[1,2],age:3 }
function queryStringParse(querystring) {
	let query = {};
	if (querystring) {
		(querystring.match(/([A-Za-z0-9-_]*)=([A-Za-z0-9-_]*)/g) || []).forEach(element => {
			let params = element.split('=');
			key = params[0];
			val = params[1];
			if (query[key]) {
				if (query[key] instanceof Array) {
					query[key].push(val);
				} else {
					query[key] = [query[key], val];
				}
				query[key].sort();
			} else {
				query[key] = val;
			}
		});
	}
	return query;
}
