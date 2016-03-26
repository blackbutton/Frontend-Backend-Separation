module.exports = function(config) {

    var gulpConfig = require('./gulp.config')();

    // 代码覆盖率有问题
    // progress 又是什么鬼呢？
    config.set({
        // 下面files里的基础目录
        basePath: '../',
        // 应用的测试框架
        frameworks: ['jasmine'],
        // exclude
        exclude: gulpConfig.karmaOption.exclude,
        // 测试环境需要加载的JS信息
        files: ['./client/src/vendor/angular-1.2.29/angular.js', './client/src/vendor/angular-1.2.29/angular-mocks.js', './client/gulp/app.js', './client/test/unit/specs/**.spec.js'],
        //  gulpConfig.karmaOption.preprocessors
        preprocessors: {
            './client/gulp/app.js': ['coverage']
        },
        reporters: ['progress', 'mocha', 'coverage', 'junit'],
        coverageReporter: gulpConfig.karmaOption.coverage,
        junitReporter: gulpConfig.karmaOption.junit,
        reportSlowerThan: 500,
        // 用什么环境测试代码,这里是chrome`
        browsers: ['Chrome']
            // 是否自动监听上面文件的改变自动运行测试
            // autoWatch: true,
            // // 用到的插件,比如chrome浏览器与jasmine插件
            // plugins: [
            //     'karma-chrome-launcher',
            //     'karma-firefox-launcher',
            //     'karma-jasmine',
            //     'karma-junit-reporter'
            // ],
            // // 测试内容的输出以及导出用的模块名
            // reporters: ['progress', 'junit'],
            // // 设置输出测试内容文件的信息
            // junitReporter: {
            //     outputFile: 'test_out/unit.xml',
            //     suite: 'unit'
            // }

    });
};
