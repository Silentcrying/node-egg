'use strict';

const { Service } = require('egg');

class NewsService extends Service {
  // 获取新闻列表
  async getNewsList(pz) {
    const page = pz !== undefined ? pz : 1;
    const { api } = this.config;
    const res = await this.ctx.curl(api + 'appapi.php?a=getPortalList&catid=20&page=' + page);
    let result = [];
    if (res.status === 200) {
      result = JSON.parse(res.data).result;
      return result;
    }
    return result;
  }

  // 获取新闻详情
  async getNewsDetail(id) {
    const { api } = this.config;
    const res = await this.ctx.curl(`${api}appapi.php?a=getPortalArticle&aid=${id}`);
    // console.log(JSON.parse(res.data), id, '新闻详情');
    let result = [];
    if (res.status === 200) {
      result = JSON.parse(res.data).result[0];
      return result;
    }
    return result;
  }
}

module.exports = NewsService;
