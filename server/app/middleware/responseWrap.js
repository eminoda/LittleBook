module.exports = () => {
  return async function responseWrap(ctx, next) {
    let timing = Date.now();
    try {
      await next();
      timing = Date.now() - timing;
      ctx.body = {
        code: "ok",
        data: ctx.body,
        timing
      };
    } catch (err) {
      console.log(err);
      ctx.body = {
        code: "error",
        msg: err && err.msg,
        timing
      };
    }
  };
};
