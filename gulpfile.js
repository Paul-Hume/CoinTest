var gulp = require('gulp');
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('ts', [], function () {
    return gulp.src('dev/ts/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            //out: 'output.js'
        }))
        .pipe(gulp.dest('dev/js'));
});

gulp.task('concat-scripts', ['ts'], function() {
    return gulp.src([
        'dev/js/app.js',
        'dev/js/**/*.service.js',
        'dev/js/**/*.controller.js'
	])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('ngAnnotate', ['concat-scripts'], function() {
    return gulp.src('dist/scripts/**/*.js')
        .pipe(ngAnnotate())
        .pipe(gulp.dest('dist/scripts'));
})

gulp.task('scripts', ['ngAnnotate'], function (cb) {
	return gulp.src('dist/scripts/*.js')
		.pipe(
        	uglify()
		)
        .pipe(
			gulp.dest('dist/scripts')
		)
});

gulp.task('watch', function() {
    gulp.watch('dev/ts/**/*.ts', ['scripts']);
});

gulp.task('default', ['scripts'], function() {});