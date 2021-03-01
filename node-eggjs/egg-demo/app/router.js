'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
// eslint-disable-next-line arrow-parens
module.exports = (app) => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/admin', controller.admin.index);

  // 动态路由写法
  router.get('/newList/:id', controller.admin.newList);

  // 使用模板引擎
  router.get('/news', controller.admin.newsPage);

  router.get('/home/indexs', controller.admin.indexs);
  // 重定向
  router.redirect('/indexs', '/home/indexs', 302);

  // 新闻页面
  router.get('/newsPage', controller.news.getNewsList);
  // 新闻详情页
  router.get('/newsDetail', controller.news.getNewsDetail);

  // 展示表单页面
  router.get('/form', controller.news.formModal);
  // post请求
  router.post('/sendInfo', controller.news.getFormData);
};
