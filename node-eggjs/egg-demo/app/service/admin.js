'use strict';

const { Service } = require('egg');

class AdminService extends Service {
  async getNewsList() {
    // eslint-disable-next-line array-bracket-spacing
    const list = [111, 222, 333];
    return list;
  }
}

module.exports = AdminService;
