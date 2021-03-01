'use strict';

module.exports = (option, app) => {
  return async (ctx, next) => {
    console.log(ctx, '中间件中的context对象内容', option, app);

    // 设置模板的全局变量 csrf
    ctx.state.csrf = ctx.csrf;
    await next();
  };
};
