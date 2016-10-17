var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var typescript = require('gulp-tsc');
var runSequence = require('run-sequence');
var ts = require("gulp-typescript");

var tsProject = ts.createProject("tsconfig.json");

gulp.task('compile', function(){
    return gulp.src(['src/ts/**/*.ts'])
        .pipe(tsProject())
        /*.pipe(typescript())*/
        .js.pipe(gulp.dest('src/js/'));
});

gulp.task('test', function() {
    return gulp.src('spec/*.js')
        .pipe(tsProject())
        .pipe(jasmine());
});

gulp.task('default', function() {
    runSequence( 'compile', 'test' );
});
