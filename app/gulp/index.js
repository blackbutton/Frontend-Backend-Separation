// 每个 task 必须依赖的四个参数

var gulp = require('gulp');

var config = require('./gulp.config')();

var $ = require('gulp-load-plugins')({
    lazy: true
});


var args = require('yargs').argv;

// 从文件夹或者  tasks 读取任务列表
var taskList = require('fs').readdirSync('./gulp/tasks');

taskList.forEach(function(file) {

    if (!file.match(/.task.js$/i)) {
        console.log(file + 'is not a task file  named as "*.task.js"');
        return;
    }
    require('./tasks/' + file)(gulp, config, $, args);
});



// 默认任务，展示所有 task

gulp.task('default', $.taskListing);
