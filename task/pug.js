const gulp = require('gulp')
const pug = require('gulp-pug')
const gulpif = require('gulp-if')
const plumber = require('gulp-plumber')
// const watch = require('gulp-watch')
// var changed = require('gulp-changed')
const debug = require('gulp-debug')
const cached = require('gulp-cached')
const remember = require('gulp-remember')
const rename = require('gulp-rename')
const browserSync = require('browser-sync').create()
const config = require('./config')
const reload = browserSync.reload
const dev = config.dev

const parseName = file => file.basename = file.basename.replace('.entry', '' )

const CACHED_KEY = 'pug-cache'

gulp.task('pug', function () {
  return gulp.src(`${config.viewEntery}**/*.entry.pug`)
  // .pipe(gulpif(dev, watch(config.viewEntery + '**/*.pug', () => reload({ stream: true }))))
  // .pipe(changed(config.viewOutput))
  .pipe(cached(CACHED_KEY))
  .pipe(plumber())
  .pipe(pug({
    pretty: dev,
    opts: {
      basedir: 'app/view'
    },
    data: {
      dev
    }
  }))
  .pipe(plumber.stop())
  .pipe(rename(parseName))
  .pipe(debug({title: 'pug-debug'}))
  .pipe(remember(CACHED_KEY))
  .pipe(gulp.dest(config.viewOutput))
  .pipe(reload({ stream: true }))
})

gulp.task('pug:watch', ['pug'], () => {
  var watcher = gulp.watch(config.viewEntery + '**/*.pug', ['pug'])
  watcher.on('change', function (event) {
    if (event.type === 'deleted') {
      delete cached.caches[CACHED_KEY][event.path]
      remember.forget(CACHED_KEY, event.path)
      return
    }
    var path = event.path
    if (path.indexOf('.entry.') == -1) {
      try {
        cached.caches[CACHED_KEY] = {}
      } catch (e) {
        console.log(e)
      }
    }
  })
})
