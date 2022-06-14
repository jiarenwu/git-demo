// gulp的主文件，用于注册任务
//此处代码都是由node执行

var gulp = require("gulp") //载入gulp模块
var less = require("gulp-less")
var watch = require("gulp-watch")
var cssnano = require('gulp-cssnano')
var browserSync = require("browser-sync").create()
// const watch = require("gulp-watch")
//注册任务
gulp.task('copy', function () {
    //console.log("hello world");
    //合并，压缩之类的操作
    //复制文件
    gulp.src('src/index.html').pipe(gulp.dest('dist/'))
})
gulp.task('style', function () {
    gulp.src('src/styles/*.less').pipe(less()).pipe(cssnano()).pipe(gulp.dest('dist/css/'))
})
// gulp.task('default', function () {
//     return gulp.src('main.css')
//         .pipe(sourcemaps.init())
//         .pipe(cssnano())
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest('./out'));
// })

let taskSeries = gulp.parallel("copy")
let taskCss = gulp.parallel("style")

gulp.task('dist', function () {
    // src/index.html
    watch('src/index.html', taskSeries)
    watch('src/styles/*.less', taskCss)


});
gulp.task('serve', function () {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    })

});
