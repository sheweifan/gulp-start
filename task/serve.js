const gulp = require('gulp')
const config = require('./config')
const browserSync = require('browser-sync').create()
const proxyMiddleware = require('http-proxy-middleware')
const reload = browserSync.reload

gulp.task('serve', () => {
  var target = 'http://api.xxx.com'
	const middleware = proxyMiddleware(['/xxx/xxx'], {target: target, changeOrigin: true});
  browserSync.init({
    server: {
      baseDir: "./dist",
      directory: true,
			middleware: middleware
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
