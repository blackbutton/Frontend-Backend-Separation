module.exports = function(gulp, config, $, args) {


    // api.js 编译成 文档
    gulp.task('doc:publish', ['clean:doc'], function() {
        return gulp.src(config.doc.source)
            .pipe($.apiDoc())
            .pipe(gulp.dest(config.doc.target));
    });


    // 生成 API 文档 并且浏览器打开 API 文档地址
    // 本地地址 http://127.0.0.1:4000/doc/

    gulp.task('doc', ['doc:publish'], function() {
        gulp.src(__filename)
            .pipe($.open({
                uri: 'http://127.0.0.1:4000/doc'
            }));
    });

    /**
     * 部署 api 文件到219 服务器
     *  1. 你需要 219 的 SSH 私钥
     *  2. 如果你的文件超过16个 会上传失败
     *  请到 node_modules/gulp-rsync/node_modules/through2
     *  把 highWaterMark: 16 改为 highWaterMark: 10000或者更大的数字
     */

    gulp.task('doc:deploy', ['doc:publish'], function() {
        gulp.src(config.doc.pushSource)
            .pipe($.rsync({
                root: config.doc.rootPath,
                hostname: '219',
                username: 'root',
                destination: config.doc.destination,
                progress: true
            }))
    });

}
