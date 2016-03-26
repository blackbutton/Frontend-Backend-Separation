module.exports = function(gulp, config, $, args) {

    gulp.task('styl', function() {
        config.fn.log('Compiling Stylus file to CSS');

        return gulp
            .src(config.css.styl)
            //.pipe($.plumber())
            // exit gracefully if something fails after this
            .pipe($.stylus({
                'include css': true
            }))
            .pipe(gulp.dest(config.css.root));
    });
};
