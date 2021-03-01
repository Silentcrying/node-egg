'use strict';

const { Controller } = require('egg');

class AdminController extends Controller {
  async index() {
    const { ctx } = this;
    // 获取get调用的参数 ctx为context
    const query = ctx.query;
    console.log(query, '阿拉蕾');
    ctx.body = '管理员界面';
  }

  async newList() {
    const { ctx } = this;
    // 获取动态路由
    const option = ctx.params;
    console.log(option, '动态路由');
    ctx.body = '动态路由';
  }

  // 使用模板
  async newsPage() {
    const { ctx } = this;

    // 模板中使用参数
    const ejs = 'ejs';
    // eslint-disable-next-line array-bracket-spacing
    const list = await ctx.service.admin.getNewsList();
    await ctx.render('news', {
      msg: ejs,
      list,
    });
  }

  // 重定向body
  async indexs() {
    this.ctx.body = '哈哈哈 重定向';
  }
}

module.exports = AdminController;
