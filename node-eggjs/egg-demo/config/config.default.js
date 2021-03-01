/* eslint valid-jsdoc: "off" */

'use strict';

const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
// eslint-disable-next-line arrow-parens
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1613977927966_8530';

  // add your middleware config here
  config.middleware = [];

  // 配置模板引擎  (将.html文件以ejs格式渲染)
  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 公共的新闻url
  config.api = 'http://www.phonegap100.com/';

  // 定时任务执行日志
  config.customLogger = {
    scheduleLogger: {
      consoleLevel: 'DEBUG',
      file: path.join(appInfo.root, 'Logs', appInfo.name, 'egg-schedule.log'),
    },
  };

  // post 请求时配置csrf token
  // config.security = {
  //   csrf: {
  //     queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
  //     bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
  //   },
  // };

  // 使用 运行中间件 middleware
  // eslint-disable-next-line array-bracket-spacing
  config.middleware = ['csrf'];
  // 配置 csrf 中间件的配置
  config.csrf = {
    user: 'test_demo',
    url: 'http://wwww.kengni.com',
  };
  return {
    ...config,
    ...userConfig,
  };
};
