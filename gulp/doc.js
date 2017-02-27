//https://www.npmjs.com/package/gulp-jsdoc3
var gulp = require('gulp');
var jsdoc = require('gulp-jsdoc3');
//todo
gulp.task('doc', function (cb) {
    gulp.src(['README.md', './src/js/pattern/util/**/*.js'], {read: false})
        .pipe(jsdoc(cb));
});