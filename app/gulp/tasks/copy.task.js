module.exports = function(gulp, config, $, args) {


    // 复制图片到 dev
    gulp.task('copy:img:dev', function() {
        return copy(config.img.src, config.img.dev)
    })

    // 复制图片到 back
    gulp.task('copy:img:back', function() {
        return copy(config.img.src, config.img.back)
    })


    // 压缩图片、复制图片到 prod
    gulp.task('copy:img:prod', function() {
        return gulp.src(config.img.src)
            .pipe($.imagemin({
                optimizationLevel: 4 // TODO 待测试
            }))
            .pipe($.changed(config.img.prod))
            .pipe(gulp.dest(config.img.prod));
    })


    // 复制 vendor
    // TODO 对第三方组件进行压缩

    gulp.task('copy:vendor:dev', function() {
        return copy(config.vendor.src, config.vendor.dev);
    });

    gulp.task('copy:vendor:back', function() {
        return copy(config.vendor.src, config.vendor.back);
    });

    gulp.task('copy:vendor:prod', function() {
        return copy(config.vendor.src, config.vendor.prod);
    });



    // 复制 favicon

    gulp.task('copy:favicon:dev', function() {
        return copy(config.favicon.src, config.build.dev);
    });

    gulp.task('copy:favicon:back', function() {
        return copy(config.favicon.src, config.build.back);
    });

    gulp.task('copy:favicon:prod', function() {
        return copy(config.favicon.src, config.build.prod);
    });



    // 复制 html 模板页面
    gulp.task('copy:partials:dev', function() {
        return copy(config.partials.src, config.partials.dev);
    });


    ////////

    function copy(src, dest) {
        return gulp.src(src)
            .pipe($.changed(dest))
            .pipe(gulp.dest(dest));
    }



}
