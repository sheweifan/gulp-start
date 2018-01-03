const gulp = require('gulp')
const config = require('./config')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: "./dist",
      directory: true
    },
    logFileChanges: true,
    logConnections: true,
    files: [
      './dist/**/*.{js,css,html,png,jpg,gif}'
    ],
    open: false,
    ghostMode: {
      clicks: true,
      forms: true,
      scroll: true
    },
    port: config.port
  })
  // gulp.watch([
  //   'app/**/*.js',
  //   'app/**/*.styl',
  //   'app/**/*.pug'
  // ]).on('change', reload)
})
