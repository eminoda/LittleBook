module.exports = () => {
	return async function responseWrap(ctx, next) {
		let timing = Date.now();
		try {
			await next();
			timing = Date.now() - timing;
		} catch (err) {
			ctx.body = {
				code: 'error',
				msg: error.msg,
				timing
			};
		}
		ctx.body = {
			code: 'ok',
			data: ctx.body,
			timing
		};
	};
};
