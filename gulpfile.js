'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rimraf = require('gulp-rimraf');
var webserver = require('gulp-webserver');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var jeditor = require('gulp-json-editor');

// 静态文件打包合并
var webpack = require('gulp-webpack');
// MD5戳
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var runSequence = require('run-sequence');
var md5File = require('md5-file');

var URL, ENV = require('./environment.js');
var config = require('./webpack.config');

gulp.task('js:build', function () {
  return gulp.src(['./src/'])
    .pipe(webpack(config))
    .pipe(gulp.dest('./static'));
});

gulp.task('sass', function () {
  return gulp.src('./src/app.scss')
    .pipe(sass())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./static'));
});

gulp.task('clean:static', function(){
  return gulp.src('./static/*', {read: false}).pipe(rimraf());
});

gulp.task('copy:static', function(){
  return gulp.src(['./index.html'], { base: './' })
  .pipe(gulp.dest('./static'));
});

gulp.task('watch', function(){
  gulp.watch(['./src/app.scss', './src/*/*.scss'], ['sass']);
  gulp.watch(['./src/*.js', './src/*/*.js', './src/*/*.html'], ['js:build']);
  gulp.watch(['./index.html'], ['copy:static']);
});

gulp.task('webserver', function() {
  gulp.src('./static')
    .pipe(webserver({
      livereload: true,
      open: 'http://127.0.0.1:8000/'
    }));
});

gulp.task('default', function(cb){
  runSequence('clean:static', ['sass', 'js:build'], 'copy:static', 'webserver', 'watch', cb);
});

// build

gulp.task('build:js', function () {
  return gulp.src(['./src/'])
    .pipe(webpack(config))
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./dist'))
    .pipe(rev.manifest("rev.json",{
      merge: true
    }))
    .pipe(gulp.dest('./dist'));
});
gulp.task('build:css', function () {
  return gulp.src(['./src/app.scss'])
    .pipe(sass())
    .pipe(minifycss())
    .pipe(concat('app.css'))
    .pipe(rev())
    .pipe(gulp.dest('./dist'))
    .pipe(rev.manifest("rev.json",{
      merge: true
    }))
    .pipe(gulp.dest('./dist'));
});
gulp.task('copy:dist', function(){
  return gulp.src(['./index.html', './src/img/*'], { base: './' })
  .pipe(gulp.dest('./dist'));
});
gulp.task('clean:dist', function(){
  return gulp.src('./dist/*', {read: false}).pipe(rimraf());
});

gulp.task('revCollector', function () {
  return gulp.src(['dist/rev.json', 'dist/index.html', 'dist/*.css'])
    .pipe(revCollector({
      replaceReved: true,
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('manifest', function () {
  gulp.src("dist/rev.json")
  .pipe(jeditor(function(json) {
    var lists = [];
    for (var key in json) {
      lists.push({
        //name: json[key].substring(json[key].lastIndexOf('/')+1),
        name: key.substring(key.lastIndexOf('/')+1),
        url: json[key],
        md5: md5File('dist/' + json[key])
      });
    }
    json = {
      lists: lists,
      version: (new Date()).getTime(),
      prefix: URL
    };
    return json;
  }))
  .pipe(gulp.dest("./dist"));
});

gulp.task('build', ['clean:dist'], function (callback) {
  runSequence(
    ['build:css', 'build:js'],
    'copy:dist', 'revCollector',
    callback);
});

gulp.task('build:dev', ['build'], function(cb){
  URL = ENV.DEV;
  runSequence('manifest', cb);
});
