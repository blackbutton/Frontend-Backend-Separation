module.exports = function(gulp, config, $, args) {




    // 将所有 partials 下的模板 html 文件压缩成 templatescache.js
    // 放在 src/js 下

    gulp.task('template:cache', function() {
        config.fn.log('Creating an AngularJS $templateCache');

        return gulp
            .src(config.partials.src)
            .pipe($.htmlmin({
                collapseWhitespace: true
            }))
            .pipe($.angularTemplatecache(
                config.partials.target, config.partials.options
            ))
            .pipe(gulp.dest(config.client.src + 'js'));
    });




}
