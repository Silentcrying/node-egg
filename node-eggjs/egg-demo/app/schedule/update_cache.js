'use strict';

// demo 为更新远程数据到内存缓存的定时任务
const Subscription = require('egg').Subscription;

class UpdateCache extends Subscription {
  // 通过schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '1m', // 1 分钟间隔
      type: 'all', // 指定所有的worker都需要执行
    };
  }

  // subscribe 是真正的定时任务执行时运行的函数
  async subscribe() {
    // const res = await this.ctx.curl('http://www.api.com/cache', {
    //   dataType: 'json',
    // });
    const { api } = this.config;
    const res = await this.ctx.curl(api + 'appapi.php?a=getPortalList&catid=20');
    console.log(res, `定时任务返回的内容, 当前时间${new Date()}`);
    // this.ctx.app.cache = res.data;
  }
}

module.exports = UpdateCache;

/**
 * 可以简写为下面的样子
 *
 * module.exports = {
  schedule: {
    interval: '1m', // 1 分钟间隔
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    const res = await ctx.curl('http://www.api.com/cache', {
      dataType: 'json',
    });
    ctx.app.cache = res.data;
  },
};
 */
