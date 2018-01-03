const gulp = require('gulp');
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const gulpif = require('gulp-if')
const watch = require('gulp-watch')
const browserSync = require('browser-sync').create()
const config = require('./config')
const dev = config.dev
const reload = browserSync.reload

const entry = `${config.imageEntery}**/*.{png,jpg,gif,ico}`
gulp.task('image', function () {
  return gulp.src(entry)
    .pipe(gulpif(dev, watch(entry, () => reload({stream: true}))))
    .pipe(gulpif(!dev,imagemin({
        progressive: true,
        use: [pngquant()]
    })))
    .pipe(gulp.dest(config.imageOutput));
})

gulp.task('image:watch', ['image'])
