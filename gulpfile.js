var gulp = require('gulp');
var compass = require('gulp-compass');
var jade = require('gulp-jade');
var prettify = require('gulp-prettify');
var rename = require('gulp-rename');
var minify = require('gulp-csso');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var shell = require('gulp-shell');
var browserSync = require('browser-sync');

var paths = {
  'html': 'src/',
  'scss': 'src/css/',
  'img': 'src/images/',
  'dist': 'dist/',
  'css': 'dist/css'
}

gulp.task('bs', function() {
  browserSync.init({
    server: {
      baseDir: paths.dist,
      index: 'index.html'
    },
    notify: true
  });
});

gulp.task('html', function() {
  return gulp.src([
    paths.html + '**/*.jade',
    '!' + paths.html + '**/_*.jade'
    ])
    .pipe(jade())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('prettify', ['html'], function() {
  return gulp.src(paths.dist + '**/*.html')
    .pipe(prettify({
      brace_style: 'collapse',
      indent_size: 2,
      indent_char: ' '
    }))
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('compass', function() {
  gulp.src(paths.scss + '**/*.scss')
  .pipe(compass({
    style: 'expanded',
    comments: false,
    css: paths.css,
    sass: paths.scss
  }))
  .pipe(gulp.dest(paths.css))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', function() {
  gulp.watch([paths.html + '**/*.jade'], ['prettify']);
  gulp.watch([paths.scss + '**/*.scss'], ['compass']);
});

gulp.task('default', ['bs', 'prettify', 'compass', 'watch']);
