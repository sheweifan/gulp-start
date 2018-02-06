// const less = require('gulp-less')
const gulp = require('gulp')
const stylus = require('gulp-stylus')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const base64 = require('gulp-base64')
const plumber = require('gulp-plumber')
const gulpif = require('gulp-if')
const cleanCSS = require('gulp-clean-css')
const debug = require('gulp-debug')
const rename = require('gulp-rename')
const browserSync = require('browser-sync').create()
// const watch = require('gulp-watch')
// var changed = require('gulp-changed')
const cached = require('gulp-cached')
const remember = require('gulp-remember')
const csso = require('gulp-csso')
// const spriter = require('gulp-css-spriter');
const config = require('./config')
const dev = config.dev
const reload = browserSync.reload

var autoprefixerOptions = {
  browsers: config.browserVersion,
  remove: true
}
var base64Options = {
  baseDir: './app/',
  extensions: ['png', 'gif', 'jpg', 'jpeg'],
  maxImageSize: config.base64Size,
  debug: true
}

const CACHED_KEY = 'stylus-cache'

const parseName = file => file.basename = file.basename.replace('.entry', '' ) // dev ? '': '.min')

const style = () => {
  gulp.src(config.styleEntery + '**/*.entry.styl')
  // .pipe(gulpif(dev, watch(config.styleEntery + '**/*.styl',() => reload({stream: true}))))
    .pipe(cached(CACHED_KEY))
    .pipe(plumber())
    .pipe(gulpif(dev, sourcemaps.init()))
    .pipe(stylus())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulpif(!dev, cleanCSS()))
    .pipe(gulpif(!dev, base64(base64Options)))
    .pipe(csso({
      restructure: false,
      sourceMap: true,
      debug: dev
    }))
    .pipe(gulpif(dev, sourcemaps.write()))
    .pipe(plumber.stop())
    .pipe(rename(parseName))
    .pipe(debug({title: 'stylus-debug'}))
    .pipe(remember(CACHED_KEY))
    .pipe(gulp.dest(config.styleOutput))
    .pipe(reload({ stream: true }))
}

gulp.task('style', style)

gulp.task('style:watch', ['style'], () => {
  const watcher = gulp.watch(config.styleEntery + '**/*.styl', ['style'])
  watcher.on('change', function (event) {
    if (event.type === 'deleted') {
      delete cached.caches.scripts[event.path]
      remember.forget(CACHED_KEY, event.path)
    }
  })
})
