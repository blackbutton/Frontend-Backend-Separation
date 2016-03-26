module.exports = function(gulp, config, $, args) {

    var browserSync = require('browser-sync');
    var port = process.env.PORT || config.browserSync.defaultPort;
    var proxyMiddleware = require('http-proxy-middleware');
    var exec = require('child_process').exec;

    var tokens = require('./../gulp.token.js');

    gulp.task('mock', $.shell.task([
        'node ' + config.server.base + 'server.js'
    ]))


    gulp.task('server:dev', function() {

        var apiProxy = proxyMiddleware(config.apiRoute, {
            target: config.localServer,
            changeOrigin: true
        });
        var apiProxy2 = proxyMiddleware('/static', {
            target: config.staticServer,
            changeOrigin: true
        });


        browserSync({
            files: config.build.devBase,
            server: {
                baseDir: config.build.devBase,
                index: 'index.html',
                middleware: [apiProxy, apiProxy2]
            },
            startPath: config.contextPath
        });


        gulp.watch(config.img.src, ['copy:img:dev']);
        gulp.watch(config.vendor.src, ['copy:vendor:dev']);
        gulp.watch(config.partials.src, ['copy:partials:dev']);
        gulp.watch(config.favicon.src, ['copy:favicon:dev']);
        gulp.watch(config.watchIndex, ['build:dev:index']);


    })


    gulp.task('dev', $.sequence('build:dev', 'server:dev'));


    gulp.task('server:back', function() {
        var apiProxy = proxyMiddleware(config.apiRoute, {
            target: config.backendServer,
            changeOrigin: true,
            headers: {
                Authorization: 'Bearer ' + tokens.token,
                'x-api-version': 1
            }
        });
        var apiProxy2 = proxyMiddleware('/static', {
            target: config.staticServer,
            changeOrigin: true
        });

        var apiProxy3 = proxyMiddleware('/datacenter', {
            target: config.backendServer,
            changeOrigin: true,
            headers: {
                Authorization: 'Bearer ' + tokens.token,
                'x-api-version': 1
            }
        });

        var apiProxy4 = proxyMiddleware('/xgk/dwr', {
            target: config.backendServer,
            changeOrigin: true,
            headers: {
                Authorization: 'Bearer ' + tokens.token,
                'x-api-version': 1
            }
        });
        var apiProxy5 = proxyMiddleware('/xgk/gyTeacher', {
            target: config.backendServer,
            changeOrigin: true,
            headers: {
                Authorization: 'Bearer ' + tokens.token,
                'x-api-version': 1
            }
        });
        // datacenter


        browserSync({
            files: config.build.backBase,
            server: {
                baseDir: config.build.backBase,
                index: 'index.html',
                middleware: [apiProxy, apiProxy2, apiProxy3, apiProxy4, apiProxy5]
            },
            startPath: config.contextPath
        });

        gulp.watch(config.img.src, ['copy:img:back']);
        gulp.watch(config.vendor.src, ['copy:vendor:back']);
        gulp.watch(config.partials.src, ['template:cache']);
        gulp.watch(config.favicon.src, ['copy:favicon:back']);
        gulp.watch(config.watchIndex, ['build:back:index']);

    })

    gulp.task('back', $.sequence('build:back', 'server:back'));

    gulp.task('server:prod', function() {
        var apiProxy = proxyMiddleware(config.apiRoute, {
            target: config.prodServer,
            changeOrigin: true,
            headers: {
                Authorization: 'Bearer ' + tokens.token,
                'x-api-version': 1
            }
        });

        var apiProxy2 = proxyMiddleware('/static', {
            target: config.staticServer,
            changeOrigin: true
        });

        var apiProxy3 = proxyMiddleware('/datacenter', {
            target: config.prodServer,
            changeOrigin: true,
            headers: {
                Authorization: 'Bearer ' + tokens.token,
                'x-api-version': 1
            }
        });

        var apiProxy4 = proxyMiddleware('/xgk/dwr', {
            target: config.prodServer,
            changeOrigin: true,
            headers: {
                Authorization: 'Bearer ' + tokens.token,
                'x-api-version': 1
            }
        });
        var apiProxy5 = proxyMiddleware('/xgk/gyTeacher', {
            target: config.prodServer,
            changeOrigin: true,
            headers: {
                Authorization: 'Bearer ' + tokens.token,
                'x-api-version': 1
            }
        });
        browserSync({
            files: config.build.prodBase,
            server: {
                baseDir: config.build.prodBase,
                index: 'index.html',
                middleware: [apiProxy,apiProxy2,apiProxy3,apiProxy4,apiProxy5]
            },
            startPath: config.contextPath
        });


        gulp.watch(config.img.src, ['copy:img:prod']);
        gulp.watch(config.vendor.src, ['copy:vendor:prod']);
        gulp.watch(config.partials.src, ['template:cache']);
        gulp.watch(config.favicon.src, ['copy:favicon:prod']);
        gulp.watch(config.watchIndex, ['build:prod:index']);
    })


    gulp.task('prod', $.sequence('build:prod', 'server:prod'));



    // 一个命令行窗口开两个服务器，效果不是很好。

    // gulp.task('server:dev', function(cb) {
    //     exec('gulp server:local', function(err, stdout, stderr) {
    //         console.log(stdout);
    //         console.log(stderr);
    //         cb(err);
    //     });
    //     exec('node ' + config.server.base + 'server.js', function(err, stdout, stderr) {
    //         console.log(stdout);
    //         console.log(stderr);
    //         cb(err);
    //     });

    // })





};
