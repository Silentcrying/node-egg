# 官网文档 https://eggjs.org/zh-cn/basics/schedule.html
## Egg.js
  - Egg.js是 《阿里旗下产品》 基于Node.js和Koa的企业级应用开发框架，可帮助团队和开发人员降低开发和维护成本。
  + Express和Koa 是Node.js社区广泛使用的框架，简单且扩展性强，非常适合做个人项目。但框架缺少约定，标准的
    MVC模型会有千奇百怪的写法。Egg按照约定进行开发，奉行 ‘约定优于配置’，团队协作成本低。
  * Egg.js基于Es6、Es7以及typescript、Koa2使得Node.js具有更规范的开发模式、更低的学习成本、更优雅的代码、
    更少的开发成本、更少的维护成本，为企业级框架而生。
    
### Egg.js的特性
  1. 提供基于Egg定制上层框架的能力(对Eggjs进行封装 拓展)
  2. 高度可扩展的插件机制
  3. 内置多进程管理
  4. 基于Koa开发，性能优异
  5. 框架稳定，测试覆盖率高
  6. 渐进式开发(同1 Egg.js本身不能满足需求时，可进行扩展)
  
### egg安装步骤
  - npm i egg-init -g (脚手架)
  - egg-init egg-example --type=simple
  + cd egg-example
  * npm i
  
  1. 启动项目 npm run dev  open location:7001
  
  * 注意：启动时 若提示egg-bin不是内部命令 可能是相关的包没下载成功

### 目录介绍
  + app文件夹下
  ```
  demo
    app.js            (可选)用于自定义的初始化工作，参见启动自定义。关于agent.js的作用参见Agent机制
    agent.js          (可选) 同上
    app               项目开发目录
       router.js      用于配置url路由规则，具体参见router
       controller     用于解析用户的输入，处理后返回相应的结果， 具体参见Controller
          home.js     (可选)
       middleware     (可选) 用于编写中间件  具体参见Middleware
       service        (可选) 用于编写业务逻辑层，建议使用，具体参见Service
          home.js    
       schedule       (可选) 用于定时任务，具体见定时任务
          my_task.js
       public         (可选) 用于放置静态资源，具体参见egg-static
          reset.css
       view           (可选) 用于放置模板文件，由模板插件约定，具体参见模板渲染
          index.ejs
       extend         (可选) 用于框架的扩展， 具体参见框架扩展
          helper.js
          request.js
          response.js
          context.js
          application.js
          agent.js
       model          (可选) 用于放置领域模型，由领域类相关插件约定，如egg-seguelize
    config            项目配置文件
       plugin.js      用于配置需要加载的插件 具体参见插件开发
       config.default.js
       config.prod.js
       config.test.js        (可选)
       config.local.js       (可选)
       config.unittest.js    (可选)
    logs              日志文件
    node_modules
    run               项目运行配置文件
    test              单元测试文件
    .autod.conf.js
    .eslintgnore
    .eslintrc
    .gitignore
    .travis.yml
    appveyor.yml      以上六个为运行配置文件
    package.json      项目配置文件  管理项目模块等元数据

  ```

  ### 模板引擎的使用
  插件 egg-view-ejs
  eggjs中引用插件需要在配置中做对应约定。

  plugin.js 中的每个配置项支持：

    {Boolean} enable - 是否开启此插件，默认为 true
    {String} package - npm 模块名称，通过 npm 模块形式引入插件
    {String} path - 插件绝对路径，跟 package 配置互斥
    {Array} env - 只有在指定运行环境才能开启，会覆盖插件自身 package.json 中的配置

## MVC框架
  - view                   视图 模板 页面的展示
  
  + controller控制器       负责处理一些业务逻辑的处理(简单业务逻辑)

  * model 模型(service)    和数据打交道(查询数据库、操作数据库 请求数据 复杂业务逻辑)

## Eggjs框架内置基础对象
### 1. app(Application)  是全局应用对象，在一个应用中仅会实例化一个，继承自Koa.Application，可以在它上面挂载一些全局对象和方法。我们可以在插件或应用中扩展Application对象。
```
启动自定义脚本

// app.js
module.exports = app => {
  app.cache = new Cache();
};
Controller 文件

// app/controller/user.js
class UserController extends Controller {
  async fetch() {
    this.ctx.body = this.app.cache.get(this.ctx.query.id);
  }
}
```
### 2. ctx(Context) 是一个请求级别的对象，继承自Koa.Context。每次收到用户请求时，框架会实例化一个Context对象，该对象封装了这次用户请求的信息，并提供便捷方式获取请求参数或设置响应头信息。框架会将所有的Service挂载到Context实例上，一些插件也会将方法和对象挂载在它上面。
```
// app.js
module.exports = app => {
  app.beforeStart(async () => {
    const ctx = app.createAnonymousContext();

    await ctx.service.posts.load();
  });
}
```
### 3. ctx.request(Request) & ctx.reponse(Response)
   - Request是一个请求级别的对象，继承自Koa.Request。封装了Node.js原生的HTTP Request对象，提供了一系列辅助方法获取HTTP请求常用参数。
   + Reponse 是一个请求级别的对象，继承自Koa.Reponse。封装了Node.js原生的HTTP Reponse对象，提供了一系列辅助方法设置HTTP响应。
   ```
   获取方式
     可以在Controller的实例上获取当前请求的Request(ctx.request)和Reponse(ctx.reponse)实例
     // app/controller/user.js
      class UserController extends Controller {
        async fetch() {
          const { app, ctx } = this;
          const id = ctx.request.query.id;
          ctx.response.body = app.cache.get(id);
        }
      }

      Koa会在Context上代理一部分Request和Reponse上的方法和属性
        ctx.request.query.id  等同于  ctx.query.id
        ctx.response.body     等价于  ctx.body

        注意： 获取post请求的body应该使用ctx.request.body, 而不是ctx.body
   ```
### 4. Controller 提供了一个Controller基类，并推荐所有的Controller都继该基类实现。这个Controller有以下属性：
  - ctx        当前请求的Context实例
  + app        应用的Application对象
  * config     应用的配置
  - service    应用的所有service
  - logger     为当前controller封装的logger对象
  ```
  
    // 从 egg 上获取（推荐）
    const Controller = require('egg').Controller;
    class UserController extends Controller {
      // implement
    }
    module.exports = UserController;

    // 从 app 实例上获取
    module.exports = app => {
      return class UserController extends app.Controller {
        // implement
      };
    };
  ```
### 5. Service 框架提供了Service基类，并推荐所有的SService都继承该基类实现。属性和Controller一样
```
  // 从 egg 上获取（推荐）
  const Service = require('egg').Service;
  class UserService extends Service {
    // implement
  }
  module.exports = UserService;

  // 从 app 实例上获取
  module.exports = app => {
    return class UserService extends app.Service {
      // implement
    };
  };
```
### 6. ctx.helper(Helper) 用来提供一些实用的utilty函数。作用： 将常用的动作抽离在heloer.js里面成为一个独立函数，可以使用JavaScript写复杂逻辑，避免逻辑分散；Heler自身是一个类，有和Controller基类一样的属性，也会在每次请求时进行实例化，因此Helper上所有的函数都能获取当前请求相关的上下文信息。
```
  获取方式
  可以在 Context 的实例上获取到当前请求的 Helper(ctx.helper) 实例。

  // app/controller/user.js
  class UserController extends Controller {
    async fetch() {
      const { app, ctx } = this;
      const id = ctx.query.id;
      const user = app.cache.get(id);
      ctx.body = ctx.helper.formatUser(user);
    }
  }
  除此之外，Helper 的实例还可以在模板中获取到，例如可以在模板中获取到 security 插件提供的 shtml 方法。

  // app/view/home.nj
  {{ helper.shtml(value) }}

  自定义 helper 方法
  应用开发中，我们可能经常要自定义一些 helper 方法，例如上面例子中的 formatUser，我们可以通过框架扩展的形式来自定义 helper 方法。

  // app/extend/helper.js
  module.exports = {
    formatUser(user) {
      return only(user, [ 'name', 'phone' ]);
    }
  };
```
### 7. Config(app.config) 推荐应用开发遵循配置和代码分离的原则，将一些需要硬编码的业务配置都放到配置文件中，同时配置文件支持各个不同运行环境使用不同的配置，使用起来也非常方便，所有框架、插件和应用级别的配置都可以通过Config对象获取到。
```
  获取方式
  可以通过app.config从Application实例上获取到config对象，也可以在Controller，Service，Helper的实例上通过this.config来获取。

  一 配置的管理有多种方案，以下列一些常见的方案

    1.使用平台管理配置，应用构建时将当前环境的配置放入包内，启动时指定该配置。但应用就无法一次构建多次部署，而且本地开发环境想使用配置会变的很麻烦。
    2.使用平台管理配置，在启动时将当前环境的配置通过环境变量传入，这是比较优雅的方式，但框架对运维的要求会比较高，需要部署平台支持，同时开发环境也有相同痛点。
    3.使用代码管理配置，在代码中添加多个环境的配置，在启动时传入当前环境的参数即可。但无法全局配置，必须修改代码。
    
    我们选择了最后一种配置方案，配置即代码，配置的变更也应该经过 review 后才能发布。应用包本身是可以部署在多个环境的，只需要指定运行环境即可。

  二 多环境配置
     框架支持根据环境来加载配置，定义多个环境的配置文件
       config
         --config,default.js默认配置文件，所有的环境都会加载这个配置文件，一般也作为开发环境的默认配置文件
         --config.prod.js
         --config.unittest.js
         --config.local.js
     当指定env时会同时加载默认配置文件和对应的配置(具名配置)文件，具名配置和默认配置将合并(使用extend2深拷贝)成最终配置，具名配置项会覆盖默认配置文件的同名配置
  三 配置写法
     配置文件返回的是一个 object 对象，可以覆盖框架的一些配置，应用也可以将自己业务的配置放到这里方便管理。

      // 配置 logger 文件的目录，logger 默认配置由框架提供
      module.exports = {
        logger: {
          dir: '/home/admin/logs/demoapp',
        },
      };
      配置文件也可以简化的写成 exports.key = value 形式

      exports.keys = 'my-cookie-secret-key';
      exports.logger = {
        level: 'DEBUG',
      };
      配置文件也可以返回一个 function，可以接受 appInfo 参数

      // 将 logger 目录放到代码目录下
      const path = require('path');
      module.exports = appInfo => {
        return {
          logger: {
            dir: path.join(appInfo.baseDir, 'logs'),
          },
        };
      };
      内置的 appInfo 有

      appInfo	说明
      pkg	package.json
      name	应用名，同 pkg.name
      baseDir	应用代码的目录
      HOME	用户目录，如 admin 账户为 /home/admin
      root	应用根目录，只有在 local 和 unittest 环境下为 baseDir，其他都为 HOME。
      appInfo.root 是一个优雅的适配，比如在服务器环境我们会使用 /home/admin/logs 作为日志目录，而本地开发时又不想污染用户目录，这样的适配就很好解决这个问题。

      ***注意：请根据具体场合选择合适的写法，但请确保没有写出以下代码：

      // config/config.default.js
      exports.someKeys = 'abc';
      module.exports = appInfo => {
        const config = {};
        config.keys = '123456';
        return config;
      };

  四  配置加载顺序
      应用、插件、框架都可以定义以上配置，而且目录结构一致，但存在优先级(应用 > 框架 > 插件),相对于此运行环境的优先级会更高。

      比如在 prod 环境加载一个配置的加载顺序如下，后加载的会覆盖前面的同名配置。

      -> 插件 config.default.js
      -> 框架 config.default.js
      -> 应用 config.default.js
      -> 插件 config.prod.js
      -> 框架 config.prod.js
      -> 应用 config.prod.js
      注意：插件之间也会有加载顺序，但大致顺序类似，具体逻辑可查看加载器。
  
  五 合并规则
     配置的合并使用 extend2 模块进行深度拷贝，extend2 fork 自 extend，处理数组时会存在差异。

      const a = {
        arr: [ 1, 2 ],
      };
      const b = {
        arr: [ 3 ],
      };
      extend(true, a, b);
      // => { arr: [ 3 ] }
      根据上面的例子，框架直接覆盖数组而不是进行合并。
  六 配置结果
     框架在启动时会把合并后的最终配置 dump 到 run/application_config.json（worker 进程）和 run/agent_config.json（agent 进程）中，可以用来分析问题。

      配置文件中会隐藏一些字段，主要包括两类:

      如密码、密钥等安全字段，这里可以通过 config.dump.ignore 配置，必须是 Set 类型，查看默认配置。
      如函数、Buffer 等类型，JSON.stringify 后的内容特别大
      还会生成 run/application_config_meta.json（worker 进程）和 run/agent_config_meta.json（agent 进程）文件，用来排查属性的来源，如

      {
        "logger": {
          "dir": "/path/to/config/config.default.js"
        }
      }

```
### 8. Logger 日志
```
框架内置日志功能，非常方便打印各种级别的日志到对应的日志文件中，每一个logger对象都提供了四个级别的方法：

  logger.debug()
  logger.info()
  logger.warn()
  logger.error()

  在框架中提供了多个 Logger 对象，下面我们简单的介绍一下各个 Logger 对象的获取方式和使用场景。

      App Logger
      我们可以通过 app.logger 来获取到它，如果我们想做一些应用级别的日志记录，如记录启动阶段的一些数据信息，记录一些业务上与请求无关的信息，都可以通过 App Logger 来完成。

      App CoreLogger
      我们可以通过 app.coreLogger 来获取到它，一般我们在开发应用时都不应该通过 CoreLogger 打印日志，而框架和插件则需要通过它来打印应用级别的日志，这样可以更清晰的区分应用和框架打印的日志，通过 CoreLogger 打印的日志会放到和 Logger 不同的文件中。

      Context Logger
      我们可以通过 ctx.logger 从 Context 实例上获取到它，从访问方式上我们可以看出来，Context Logger 一定是与请求相关的，它打印的日志都会在前面带上一些当前请求相关的信息（如 [$userId/$ip/$traceId/${cost}ms $method $url]），通过这些信息，我们可以从日志快速定位请求，并串联一次请求中的所有的日志。

      Context CoreLogger
      我们可以通过 ctx.coreLogger 获取到它，和 Context Logger 的区别是一般只有插件和框架会通过它来记录日志。

      Controller Logger & Service Logger
      我们可以在 Controller 和 Service 实例上通过 this.logger 获取到它们，它们本质上就是一个 Context Logger，不过在打印日志的时候还会额外的加上文件路径，方便定位日志的打印位置。

```
### 9. Subscription 订阅
```
订阅模型是一种比较常见的开发模式，譬如消息中间件的消费者或调度任务。因此我们提供了 Subscription 基类来规范化这个模式。

  可以通过以下方式来引用 Subscription 基类：

  const Subscription = require('egg').Subscription;

  class Schedule extends Subscription {
    // 需要实现此方法
    // subscribe 可以为 async function 或 generator function
    async subscribe() {}
  }
插件开发者可以根据自己的需求基于它定制订阅规范，如定时任务就是使用这种规范实现的
```
### 10. 中间件(MiddleWare)
   - 中间件放置于app/middleware目录下 export一个普通的function， 接受两个参数
     1. **option：** 中间件的配置项，框架会将app.config[${middlewareName}]传递进来
     2. **app：** 当前应用的Application实例对象
     ```
     在config.default.js中配置使用
     module.exports = {
        // 配置需要的中间件，数组顺序即为中间件的加载顺序
        middleware: [ 'csrf' ],

        // 配置 csrf 中间件的配置
        csrf: {
          threshold: 1024, // 小于 1k 的响应体不压缩
        },
      };
### 11. 定时任务(app/schedule)
   - 所有的定时任务统一存放在app/schedule目录下，每一个文件均为独立的定时任务
   - 任务：
     1. **task** 或 **subscribe** 同时支持**generator function** 和 **async function**
     2. **task** 的入参为ctx， 匿名的Context实例，可以通过它调用 **service** 等
   - 定时任务： 定时任务可以指定 **interval** 或者 **cron** 两种不同的定时方式。
     1. interval
     ```
      通过schedule.interval 参数来配置定时任务的执行时机，定时任务将会每隔指定时间执行一次；
      interval可以配置成：
        数字类型，单位为毫秒数， 例如 5000
        字符类型，会通过ms转为毫秒数， 例如 5s

        module.exports = {
          schedule: {
            // 每 10 秒执行一次
            interval: '10s',
          },
        };
     ```
     2. cron
     ```
        通过schedule.cron参数配置执行时机， cron-parser进行解析时间
        注意：cron-parser 支持可选的秒（linux crontab 不支持）。

        *    *    *    *    *    *
        ┬    ┬    ┬    ┬    ┬    ┬
        │    │    │    │    │    |
        │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
        │    │    │    │    └───── month (1 - 12)
        │    │    │    └────────── day of month (1 - 31)
        │    │    └─────────────── hour (0 - 23)
        │    └──────────────────── minute (0 - 59)
        └───────────────────────── second (0 - 59, optional)
        module.exports = {
          schedule: {
            // 每三小时准点执行一次
            cron: '0 0 */3 * * *',
          },
        };
     ```
   - 类型： 框架提供两种类型: **worker** 和 **all**，都支持上面的定时方式，运行时机不同
       1. worker 类型： 每台机器上只有一个worker会执行这个定时任务，且每次执行任务的worker是随机的
       2. all 类型：每台机器上的每个worker都会执行这个定时任务
   + 其他参数：
       1. cronOption：配置cron的时区等，参见 cron-parser
       2. immediate：为true时，这任务会在应用启动并ready后立刻执行一次
       3. disable：为true时，这个定时任务不会被启动
       4. env： 数组，仅在指定的环境下才启动该定时任务
   * 执行日志：
       ```
       执行日志会输出到 ${appInfo.root}/logs/{app_name}/egg-schedule.log，默认不会输出到控制台，可以通过 config.customLogger.scheduleLogger 来自定义。

        // config/config.default.js
        config.customLogger = {
          scheduleLogger: {
            // consoleLevel: 'NONE',
            // file: path.join(appInfo.root, 'logs', appInfo.name, 'egg-schedule.log'),
          },
        };