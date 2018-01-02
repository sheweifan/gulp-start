const gulp = require('gulp')
const plumber = require('gulp-plumber')
const gulpif = require('gulp-if')
const uglify = require('gulp-uglify')
const webpackStream = require('webpack-stream')
const babel = require('gulp-babel')
const named = require('vinyl-named')
const remember = require('gulp-remember')
const cached = require('gulp-cached')
const rename = require('gulp-rename')
const changed = require('gulp-changed');

const config = require('./config')
const dev = config.dev
const uglifyConfig = {
  compress: {
    properties: false
  },
  output: {
    'quote_keys': true
  }
}

const babelConfig = {
  presets: [
    ['env', {
      targets: {
        browsers: ['last 2 versions', 'safari >= 7']
      }
    }]
  ]
}

const webpackConfig = {
  watch: false,
  module: {
    rules: [
      {
        test: /\.(es|js)$/,
        use: [{
          loader: 'babel-loader',
          options: babelConfig
        }],

      },
    ]
  }
}

gulp.task('script', function () {
  gulp.src('app/script/**/*.entry.js')
    // .pipe(changed('dist/script/'))
    .pipe(plumber())
    .pipe(cached('script-task'))
    .pipe(named())
    // .pipe(babel(babelConfig))
    .pipe(webpackStream(webpackConfig))
    .pipe(gulpif(!dev, uglify(uglifyConfig)))
    .pipe(remember('scripts-task'))
    .pipe(plumber.stop())
    .pipe(rename(file => file.basename = file.basename.replace('.entry', dev ? '': '.min')))
    .pipe(gulp.dest('dist/script/'))
});


