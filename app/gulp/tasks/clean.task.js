module.exports = function(gulp, config, $, args) {

    var del = require('del');

    // Remove all files from the build folder
    gulp.task('clean', function() {
        clean(config.build.base);
    });

    // Remove all files from the build dev folder
    gulp.task('clean:dev', function() {
        clean(config.build.devBase);
    });

    // Remove all files from the build back folder
    gulp.task('clean:back', function() {
        clean(config.build.backBase);
    });


    // Remove all files from the build prod folder
    gulp.task('clean:prod', function() {
        clean(config.build.prodBase);
    });

    // Remove all files from the build temp folder
    gulp.task('clean:temp', function() {
        clean(config.partials.targetSrc);
    });


    // Remove api doc files from the server public doc folder
    gulp.task('clean:doc', function() {
        clean(config.doc.target);
    });



    /////////

    // Log and delete the path
    function clean(path) {
        config.fn.log('Cleaning: ' + $.util.colors.red(path));
        del(path);
    }
};
