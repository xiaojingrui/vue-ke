var gulp = require('gulp')
var zip = require('gulp-zip')
var babel = require('gulp-babel')

gulp.task('zip', function() {
  return gulp
    .src('**/*.*')
    .pipe(zip('server.zip'))
    .pipe(gulp.dest('../'))
})

gulp.task('build', function() {
  return gulp
    .src(['src/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['build'])
})
