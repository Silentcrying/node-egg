'use strict';

const { Controller } = require('egg');

class NewsController extends Controller {
  // 获取新闻列表
  async getNewsList() {
    const res = await this.ctx.service.news.getNewsList();
    // console.log(res, '当前数据');
    // this.ctx.body = '当前是新闻页面';
    await this.ctx.render('page', {
      list: res,
    });
  }

  // 获取当前新闻详情
  async getNewsDetail() {
    const { ctx } = this;
    const { api } = this.config;
    const { aid } = ctx.query;
    const data = await ctx.service.news.getNewsDetail(aid);
    await this.ctx.render('detail', {
      data,
      api,
    });
  }

  // 展示form表单
  async formModal() {
    console.log(this.ctx);
    // 不使用中间件 每次请求都都附带csrf
    // await this.ctx.render('form', {
    //   csrf: this.ctx.csrf,
    // });

    // 使用中间件  将csrf设为模板的全局变量
    await this.ctx.render('form');
  }

  // 获取post请求
  async getFormData() {
    const { ctx } = this;
    const params = ctx.request.body;
    console.log(params);
  }
}

module.exports = NewsController;
