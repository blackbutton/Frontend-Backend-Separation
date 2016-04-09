# 前后端分离开发指南 V1.0



结合经过『学生成长档案』、『陕西教育资源平台』等项目前后端分离实践，对前后端分离项目重新梳理流程,重构项目结构、优化 Gulp 工作流程，并在 『新高考选课』项目中进行实践,整体出本文档。


## 一、 前后端分离目标

1. 前后端关注点分离，前后端约定 API 后，前后端可并行开发。前端只关注前端部分开发，不用等待后端开发完毕再进行前端开发，前端控制路由，展现数据。后端只负责提供接口即可；
2. 开发环境、测试环境、生产环境分离，易于测试联调；
3. 工作流程自动化，对前端资源优化，提升性能；
4. 依赖规范、工具保证团队代码风格统一，有效合作开发，
5. 总之让前端把更多时间用在开发代码而不是手工构建部署项目。

## 二、 前后端分离进展

### 1. 已经完成的工作

- [x] API 文档生成；
- [x] 前端 Mock 服务器搭建，通过 json 模拟数据请求；
- [x] 开发环境、测试环境、生产环境分离，一条命令切换环境；
- [x]  index.html 自动插入除第三方CSS,JS外所需的 css、js 文件；
- [x]  CSS 文件：
  - stylus 文件编译为 css 文件；
  - 对 CSS 文件自动识别添加前缀（-webkit,-mz等）；
  - 对 IE 进行 hack；
  - 自动获取图片宽高，智能清除浮动；
  - 修复CSS 编写常见错误；
  - 合并所有的 CSS 文件为一条CSS文件；
  - 根据这条 CSS 文件内容变化进行 MD5 重命名防止缓存；
- [x] JS 文件：
  - 对 JS 进行 lint 验证；
  - 对 JS 按顺序压缩合并成一条JS
  - 根据这条 JS 文件内容变化进行 MD5 重命名防止缓存；
- [x] 将 Angular 所有模板页面（html） 转化为 js 利于页面进行缓存；
- [x] 编辑器保存即刷新页面，免去每天上万次刷新服务器；
- [x] 所有文件内容增量覆盖更新；
- [x] 可并行、串行执行多任务，提升构建速度；
- [x] 对图片进行压缩



### 2. 需要优化解决的工作


- 图片压缩，当前图片压缩有时候会报错。
- 对主页 html 压缩
- 切换到 gulp 4.0
- 对缓存的研究，合理利用缓存，提升性能加载速速；
-  mock 服务器还不是很好用
-  combo
- **引入项目脚手架**，在开始新项目时根据需要自动生成相应项目目录、
  安装相应依赖和环境，避免每次新项目需要复制粘贴一堆东西。
- **集成单元测试,JS 要求写单元测试**；
- **使用 webpack 进行按需加载**；
- **完善前端代码规范**；

### 3. 需要加强实践的工作

- 强制对 JS 进行 lint, 对 JS 语法进行检查；
- 使用 stylus 对 CSS 进行管理；
- 强制执行代码规范；




## 三、 项目依赖技术以及工具

1. 前端 MVC 框架：

  **[Angular JS](https://angularjs.org/)**

  Angular JS 是 Google 维护的，用于开发单页面 APP 的 MVVM 的 JavaScript Web 框架,它尤其适合编写大变动饿增删改查具有 Ajax 风格的富客户端应用。它有很多不错的future，如数据双向绑定，无须对 DOM 进行显式刷新，依赖注入，强健的可测试性，使用 HTML 作为模板，可以自定义指令等。缺点是兼容性不太好，目前我们选择 **Angular 1.29** 版本开发，兼容 IE 8 以上浏览器。

  没学过 Angular 可以看下我的 slide: [Beginning AngularJS](http://padding.me/slide/angularjs/)。

2. 前端自动化构建语言：

  **[Gulp](http://gulpjs.com)**

  Gulp 是**基于流**的**自动化构建**工具，相较于 Grunt ，它易于使用配置，高效快捷，易于学习。如果你喜欢喝可乐，相信你一定会很喜欢它😊。

  没学过 Gulp 的同学可以参考：

  - [使用Gulp构建网站小白教程 by 十年踪迹](http://blog.h5jun.com/post/gulp-build.html)
  - [Gulp：任务自动管理工具 by 阮一峰](http://javascript.ruanyifeng.com/tool/gulp.html)


3. Mock 服务器搭建

  **[JSON Server](https://github.com/typicode/json-server)**

  前端本地开发时，需要 mock 后端数据， Json Server 不足30秒启动一个 Server 供你实现 get/post/put/patch 等请求，并且能够实现简单的增删改查。

  请仔细阅读 [JSON Server](https://github.com/typicode/json-server) 文档，更合理的 mock 数据。


4. CSS 预处理器：

  **[Stylus](http://stylus-lang.com/)**

  * 为什么引入 CSS 预处理器？
    - CSS 语言冗余代码多，重复输入；
    - CSS 语言无法抽象；
    - CSS 不好管理；
    - CSS 预处理器提供 CSS 缺失的样式层复用机制、减少冗余、提高样式代码的可维护性
    - CSS 预处理器一般具有的 future 有：
      1. 嵌套语法
      2. 选择器引用
      3. 声明变量，且具有变量作用域
      4. 各种插值
      5. **mixin**
      6. 继承
      7. 逻辑控制
  * 为什么选择 stylus？
    - sass 基于 ruby，需要搭建 ruby 环境不考虑；
    - less 不够健壮，编译后脏代码多；
    - stylus 利用缩进、空格和换行减少输入字符，两个字**简洁**;
    - 兼容 CSS 风格代码;
     - stylus 是 TJ 大神出品；
     - 像写 JS 一样写 CSS；
     - stylus is sexy!

5. API 文档自动生成工具：

  **[apiDoc](http://apidocjs.com/)**

  apiDoc 可以把代码中注释自动生成 RESTful web API html 文档。


  文档语法请见 http://apidocjs.com 。

6. 测试：(TODO)

  - 单元测试：

  - 端到端测试：







## 四、 项目结构目录


```bash
.   // 项目根文件夹
├── client               // 前端文件夹
│   │
│   ├── build            // Gulp 构建生成的文件夹
│   │   ├── back         // 前后端联调构建的前端代码
│   │   ├── dev          // 本地开发，后端为 mock server 的前端代码
│   │   └── prod         // 联调测试服务器或线上服务器构建的前端代码
│   │
│   └── src         // 开发环境源代码
│       │
│       ├── css
│       │   │
│       │   ├── nav.styl
│       │   └── index.css
│       │ 
│       ├── img         //(图片，如果有其他资源文件再同级新建目录，如 video/font等)
│       │ 
│       ├── js          //（共用的controller,service,directive,filter 全部放在这里)
│       │   │
│       │   ├── app.js        // app 主要配置，路由管理
│       │   │
│       │   ├── bootstrap.js  // 手工启动 ng app
│       │   │
│       │   ├── directive.js  // 公共指令
│       │   │
│       │   └── service.js    // 公共服务（api 请求等）
│       │ 
│       ├── partials  //模板和控制器
│       │   │
│       │   ├── a.js        // a控制器
│       │   │
│       │   ├── a.tpl.html  // a模板
│       │   │
│       │   ├── b.js        // b控制器
│       │   │
│       │   └── b.tpl.html  // b模板
│       │ 
│       ├── favicon.ico
│       │ 
│       └── index.html  // 主页
|
├── doc // 项目开发文档：PSD文件、原型、效果图等文档
|
├── gulp // gulp 任务
│   │
│   ├── tasks
│   │   │
│   │   ├── build.task.js   // 构建任务
│   │   │
│   │   ├── clean.task.js  // 删除文件任务
│   │   │
│   │   ├── copy.task.js   // 复制文件到指定路径任务
│   │   │
│   │   ├── css.task.js    // style 编译为 css 任务
│   │   │
│   │   ├── doc.task.js    // api 文档有关的任务
│   │   │
│   │   ├── lint.task.js   // js lint 任务
│   │   │
│   │   ├── server.task.js  // 启动各个服务器的任务
│   │   │
│   │   ├── template.task.js  // 压缩模板的任务
│   │   │
│   │   └── test.task.js    // 测试任务
│   │
│   ├── gulp.config.js // gulp 配置文件
│   │
│   ├── gulp.token.js  // 访问后端、生产环境所需要的 token
│   │
│   ├── index.js  // gulp 启动文件
│   │
│   ├── karma.conf.js  // karama 配置文件
│   │
│   └── protractor.conf.js // protractor 配置文件
│  
│  
├── node_modules  // 安装的项目所需要的 node 依赖
│  
├── server  // mock server
│   │
│   ├── public      // mock server 的静态资源
│   │   │
│   │   ├── doc     // 自动生成的 API 文档
│   │   │
│   │   └── images  // mock server 所需要的图片资源
│   │
│   ├── api.js   // 生成 API 文档的 API 接口文件
│   │
│   ├── db.json  // mock server 模拟数据的 json 文件
│   │
│   └── server.js // mock server 启动文件
│  
│  
├── .editorconfig  //（编辑器配置文件，保持不同编辑器代码风格一致）
│  
├── apidoc.json  // API 文档配置文件
│  
├── gulpfile.js  // gulp 默认启动文件
│  
├── package.json  //项目配置信息，以及所有依赖
│ 
└── README.md  // 读我项目开发注意事项

```

## 五、开发流程

### 0. 前端新建项目


- 0.1 新建项目目录
- 0.2 配置项目
- 0.3 你可以执行  gulp 查看所有的自动化任务，一般是这样的。


### 1. 前后端约定 API


### 2. 前端本地开发


对于 CSS 文件来说：


https://github.com/cssdream/cssgrace/blob/master/README-zh.md


### 3. 前后端联调

### 4. 前端联调测试服务器

### 5. 发布上线



## 六、前端开发规范
![](media/14600375310915/14601052171629.jpg)￼


## 七、More

作者： [@huhb](mailto:huhuaibo@lezhixing.com.cn)
创建时间： @2016-04-09
最后更新： @2016-04-09

在项目中有任何好的流程建议欢迎联系我，共同改进工作流。

















