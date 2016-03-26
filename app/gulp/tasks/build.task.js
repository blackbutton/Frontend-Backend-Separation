module.exports = function(gulp, config, $, args) {


    var autoprefixer = require('autoprefixer');

    /**
     *  build for development environment
     *  1. 验证 js 格式 通过之后才能继续
     *  2. 编译 styl --> css
     *  3.  build index
     *  4. copy vendor, img, favicon, partials
     */


// 'lint',
    gulp.task('build:dev:index', [ 'styl', 'clean:temp'], function() {
        buildIndex(config.build.dev);
    })

    gulp.task('build:dev', $.sequence('clean:dev', 'build:dev:index', ['copy:img:dev', 'copy:vendor:dev', 'copy:favicon:dev', 'copy:partials:dev']));



    /**
     * TODO
     */

    gulp.task('build:back:index', ['template:cache'], function() {
        buildIndex(config.build.back);
    })
// 'clean:back',
    gulp.task('build:back', $.sequence( 'clean:back','build:back:index', ['copy:img:back', 'copy:vendor:back', 'copy:favicon:back']));



    /**
     * TODO
     *  build for production environment
     * 1. copy vendor, img(compress), favicon,
     * 2. teamplatecaching  then build index
     * 3. TODO 这里需要 stylus -> css
     */

    gulp.task('build:prod:index', ['template:cache'], function() {
        buildIndex(config.build.prod);
    })

    gulp.task('build:prod', $.sequence('clean:prod', 'build:prod:index', ['copy:img:prod', 'copy:vendor:prod', 'copy:favicon:prod']));



    function buildIndex(dest) {

        var processors = [
            require('cssgrace')
        ];



        return gulp.src(config.homepage.src)
            .pipe($.inject(gulp.src(config.css.src, {
                read: false
            }), {
                relative: true
            }))
            .pipe(config.fn.inject(config.js.src, '', config.js.order))
            .pipe($.useref())
            .pipe($.if('*.js', $.ngAnnotate({
                add: true
            })))
            // 注意 在 angularjs 中有注入依赖的地方请加上 /* @ngInject */否则压缩会报错！
            .pipe($.if('*.js', $.uglify())) // 压缩Js
            .pipe($.if('*.css', $.postcss([autoprefixer({
                browsers: ['last 10 versions', 'not ie < 7']
                    // 使用 autoprefixer 进行添加 前缀
            })])))
            .pipe($.if('*.css', $.postcss(processors)))
            //  css grace 对 IE 进行 hack 获取图片高度，position:center,clear:fix 智能清除浮动
            .pipe($.if('*.css', $.csso())) // 压缩css
            .pipe($.if('*.js', $.rev())) // md5 重命名js
            .pipe($.if('*.css', $.rev())) // md5 重命名css
            .pipe($.revReplace()) // 重写文件名到html
            // TODO WHEN TO SOLVE???
            // .pipe($.htmlmin({
            //     collapseWhitespace: true
            // }))
            .pipe(gulp.dest(dest));

    }

};
