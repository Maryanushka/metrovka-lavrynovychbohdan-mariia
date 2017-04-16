"use strict"

var gulp = require('gulp'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	sass = require('gulp-sass'),
	cleanCSS = require('gulp-clean-css');

// server connect
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    port: 8000,
    livereload: true
  });
});

gulp.task('connect_next', function() {
  connect.server({
  	name:'second',
    root: 'listing',
    port: 8001,
    livereload: true
  });
});

// css
gulp.task('css', function () {
  return gulp.src('scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(cleanCSS())
    .pipe(rename('bundle.min.css'))    
    .pipe(gulp.dest('app/css/'))
    .pipe(connect.reload())
});

gulp.task('css_next', function () {
  return gulp.src('scss/listing.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(cleanCSS())
    .pipe(rename('bundle.min.css'))    
    .pipe(gulp.dest('listing/css/'))
    .pipe(connect.reload())
});

// html
gulp.task('html', function(){
	gulp.src('app/index.html')
	.pipe(connect.reload());
})
gulp.task('html_next', function(){
	gulp.src('listing/second.html')
	.pipe(connect.reload());
})
// watch
gulp.task('watch', function(){
	gulp.watch('scss/*.scss', ['css'])
	gulp.watch('app/index.html', ['html'])
})
gulp.task('watch_next', function(){
	gulp.watch('scss/listing.scss', ['css'])
	gulp.watch('listing/second.html', ['html'])
})
// default
gulp.task('default', ['connect', 'connect_next' , 'css', 'css_next' , 'html', 'watch_next', 'html_next' , 'watch_next']);