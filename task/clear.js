const gulp = require('gulp')
const shell = require('shelljs')

gulp.task('clear', function() {
  shell.rm('-rf', 'dist/')
})
