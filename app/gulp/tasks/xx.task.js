module.exports = function(gulp, config, $, args) {




    /**
     * Run test once and exit
     */
    gulp.task('test', function(done) {

        var child;
        var fork = require('child_process').fork();

        var Server = require('karma').Server;
        new Server({
            configFile: __dirname + '/../protractor.conf.js',
            singleRun: true
        }, done).start();
    });





};
