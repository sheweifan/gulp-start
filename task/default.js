const gulp = require('gulp')
const remember = require('gulp-remember')
const cached = require('gulp-cached')

gulp.task('default', ['clear', 'script'], function(){
  const watcher = gulp.watch('app/script/**/*.js', ['script'])

  watcher.on('change', function (event) {
    if (event.type === 'deleted') {
      delete cached.caches.scripts[event.path]
      remember.forget('scripts', event.path)
    }
  })
})
