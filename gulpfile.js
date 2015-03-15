'use strict';

var gulp = require('gulp'),
    del = require('del'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    sass = require('gulp-sass');

var paths = {
    dev: 'build/dev'
};

gulp.task('clean-dev', function (cb) {
    del([paths.dev], cb);
});

gulp.task('copy-html-dev', ['clean-dev'], function () {
    gulp.src([
        './app/index.html'
    ])
        .pipe(gulp.dest(paths.dev));
});

gulp.task('copy-css-dev', ['clean-dev'], function () {
    gulp.src([
        './node_modules/angular-material/angular-material.css'
    ])
        .pipe(gulp.dest(paths.dev + '/styles'));
});

gulp.task('transpile-dev', ['clean-dev'], function () {
    browserify({
        entries: './app/scripts/index.js',
        debug: true
    })
        .transform(babelify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest(paths.dev));
});

gulp.task('sass-dev', ['clean-dev'], function () {
    gulp.src('./app/styles/main.scss')
        .pipe(sass())
        .pipe(gulp.dest(paths.dev + '/styles'));

});

gulp.task('default', ['copy-html-dev', 'copy-css-dev', 'transpile-dev', 'sass-dev']);

gulp.task('watch', ['default'], function () {
    gulp.watch('.app/scripts/**/*.js', ['default'])
    gulp.watch('.app/styles/**/*.scss', ['default']);
    gulp.watch('.app/index.html', ['default']);
    gulp.watch('.app/views/**/*.html', ['default']);
});