module.exports = function() {


    // main server configs


    var localServer = 'http://127.0.0.1:4000'; // 本地服务器地址
    var backendServer = 'http://192.168.12.254:8080'; // 后端服务器地址
    var prodServer = 'http://192.168.0.216'; // 测试服务器地址
    var staticServer = 'http://127.0.0.1:8888'; // ng-vendor 所在的static 地址。
    var contextPath = 'xgk/'; // 上下文环境，项目路径
    var apiRoute = ['/xgk/api/'];
    // 需要对哪些路由转发加上 token！,注意必须这样写 '/xgkxk/api'
    var appName = 'xkApp'; //angular  app module name
    var docDestination = '/opt/vfsroot/lzx/doc/xgkxk/'; // api 文档 部署服务器位置


    // dependencies used in this file
    var gulp = require('gulp');
    var gUtil = require('gulp-util');
    var gInject = require('gulp-inject');
    var gIf = require('gulp-if');
    var gOrder = require('gulp-order');

    // base folder
    var _root = './';
    var _clientBase = _root + 'client/';
    var _serverBase = _root + 'server/';
    var _buildBase = _clientBase + 'build/';



    // client folder
    var client = {
        base: _clientBase,
        src: _clientBase + 'src/',
        test: _clientBase + 'test/'
    };

    // server folder
    var server = {
        base: _serverBase
    };

    // build folder
    var build = {
        base: _buildBase,
        devBase: _buildBase + 'dev/',
        backBase: _buildBase + 'back/',
        prodBase: _buildBase + 'prod/',
        dev: _buildBase + 'dev/' + contextPath, // 本地环境
        back: _buildBase + 'back/' + contextPath, // 前后端联调环境
        prod: _buildBase + 'prod/' + contextPath // 测试环境


    };

    // node dependency
    var nodeModules = _root + 'node_modules/';



    // all configuration which will be returned
    var config = {
        // folder
        root: _root,
        client: client,
        server: server,
        build: build,
        localServer: localServer,
        backendServer: backendServer,
        staticServer: staticServer,
        prodServer: prodServer,
        contextPath: contextPath,
        apiRoute: apiRoute,
        watchIndex: [client.src + 'js/**/*.js',
            client.src + 'partials/**/*.js', client.src + 'css/**/*.css', client.src + 'index.html'
        ], // 这些文件变化 一旦需要重新build index.html
        js:  {
            src: [client.src + 'js/**/*.js', client.src + 'partials/**/*.js'],
            dev: [build.dev + 'js/**/*.js', build.dev + 'partials/**/*.js'],
            back: [build.back + 'js/**/*.js'],
            prod: [build.prod + 'js/**/*.js'],
            order: ['**/bootstarp.js', '**/app.js', '**/*.js'],
            test: {
                stubs: [client.test + 'e2e/mocks/**/e2e.*.js'],
                unit: {
                    specs: client.test + 'unit/specs/**/*.spec.js'
                }
            }
        },

        css: {
            root: client.src + 'css/',
            styl: [client.src + 'css/**/*.styl'],
            src: [client.src + 'css/**/*.css'],
            dev: [build.dev + 'css/**/*.css'],
            back: [build.back + 'css/**/*.css'],
            prod: [build.prod + 'css/**/*.css']
        },

        img: {
            src: [client.src + 'img/**/*'],
            dev: build.dev + 'img',
            back: build.back + 'img',
            prod: build.prod + 'img'
        },
        //TODO 如何处理第三方插件包呢？？？
        vendor: {
            src: [client.src + 'vendor/**/*'],
            dev: build.dev + 'vendor',
            back: build.back + 'vendor',
            prod: build.prod + 'vendor'
        },
        partials: {
            src: [client.src + 'partials/**/*.html'],
            dev: build.dev + 'partials',
            target: 'templatescache.js',
            targetSrc: client.src + 'js/templatescache.js',
            options: {
                module: appName,
                root: 'partials/'
            }
        },
        homepage: {
            src: client.src + 'index.html'
        },
        favicon: {
            src: [client.src + 'favicon.ico']
        },
        doc: {
            source: server.base + 'api.js',
            target: server.base + 'public/doc',
            destination: docDestination,
            pushSource: server.base + 'public/doc/**/*',
            rootPath: server.base + 'public/doc/',

        },
        browserSync: {
            hostName: 'localhost',
            reloadDelay: 1000,
            defaultPort: 3000
        }
    };


    config.karmaOption = getKarmaOptions();
    config.protractorOption = getProtractorOptions();

    // common functions used by multiple tasks
    config.fn = {};
    config.fn.log = log;
    config.fn.inject = inject;

    return config;



    function getKarmaOptions() {
        var options = {
                files: [
                    staticServer + '/static/ng-vendor/angular-1.2.29/angular.js',
                    staticServer + '/static/ng-vendor/angular-1.2.29/angular-mocks.js',
                    client.src + 'app.js', './client/test/unit/specs/**.js'
                ],
                exclude: [],
                preprocessors: {},
                coverage: {
                    dir: client.test + 'unit/results/coverage',
                    reporters: [
                        // reporters not supporting the `file` property
                        {
                            type: 'html',
                            subdir: '.'
                        }, {
                            type: 'text-summary'
                        }
                    ]
                },
                junit: {
                    outputDir: config.client.test + 'unit/results/',
                    outputFile: 'unit-test-results.xml',
                    suite: 'unit'
                }
            }
            // 代码覆盖率有问题
// progress 又是什么鬼呢？
            options.preprocessors['./client/src/app.js'] = ['coverage'];
        return options;
    }


    // Options for protractor
    function getProtractorOptions() {
        // options used in protractor.conf.js need to be based on it's own path
        return {
            // specs: [client.test + 'e2e/specs/*.spec.js'],
            // suites: {
            //     home: '.' + client.test + 'e2e/specs/home.spec.js',
            //     login: '.' + client.test + 'e2e/specs/login.spec.js',
            //     dashboard: '.' + client.test + 'e2e/specs/dashboard.spec.js',
            //     phone: '.' + client.test + 'e2e/specs/phone.spec.js'
            // },
            // helper: '.' + client.test + 'e2e/helper',
            // screenshotDir: client.test + 'e2e/screenshots/'
        };
    }

    // Log function for both object type and primitive type

    function log(msg) {
        if (typeof(msg) === 'object') {
            for (var item in msg) {
                if (msg.hasOwnProperty(item)) {
                    gUtil.log(gUtil.colors.blue(msg[item]));
                }
            }
        } else {
            gUtil.log(gUtil.colors.blue(msg));
        }
    }
    // Helper function for gulp-inject
    function inject(src, label, order) {
        var options = {
            read: false,
            relative: true,
            ignorePath: '/client/build/dev'
        };
        if (label) {
            options.name = 'inject:' + label;
        }

        return gInject(orderSrc(src, order), options);
    }

    function orderSrc(src, order) {
        //order = order || ['**/*'];
        return gulp
            .src(src)
            .pipe(gIf(order, gOrder(order)));
    }



}
