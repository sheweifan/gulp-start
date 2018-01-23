const gulp = require('gulp')
const plumber = require('gulp-plumber')
const gulpif = require('gulp-if')
const uglify = require('gulp-uglify')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const named = require('vinyl-named')
const rename = require('gulp-rename')
const autoprefixer = require('autoprefixer')


// const babel = require('gulp-babel')
// const remember = require('gulp-remember')
// const cached = require('gulp-cached')
// const changed = require('gulp-changed')

const config = require('./config')
const dev = config.dev

const babelConfig = {
  presets: [
    ['env', {
      targets: {
        // browsers: config.browserVersion
        browsers: ['last 2 versions', 'safari >= 7']
      }
    }]
  ],
  plugins: [
    ['transform-runtime', {
      helpers: false,
      polyfill: false,
      regenerator: true,
      moduleName: "babel-runtime"
    }]
  ]
}

const webpackConfig = Object.assign({}, {
  watch: dev,
  module: {
    rules: [
      {
        test: /\.(es|js)$/,
        use: [{
          loader: 'babel-loader',
          options: babelConfig
        }]
      },
      {
        test: /\.(styl|css)$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers: ['iOS >= 7', 'Android >= 2']
                })
              ]
            }
          },
          'stylus-loader'
        ],
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   _: 'lodash/core'
    // }),
  ],
  externals: {
    $: 'window.$'
  }
}, dev ? {devtool: 'cheap-source-map'}: {})

const uglifyConfig = {
  compress: {
    properties: false
  },
  output: {
    quote_keys: true
  }
}

const parseName = file => file.basename = file.basename.replace('.entry', '' ) // dev ? '': '.min')

const script = () => {
  gulp.src(`${config.scriptEntery}**/*.entry.js`)
    // .pipe(changed(config.scriptOutput))
    // .pipe(gulpif(!passCached,cached('script-task')))
    .pipe(plumber())
    .pipe(named())
    // .pipe(babel(babelConfig))
    .pipe(webpackStream(webpackConfig))
    .pipe(gulpif(!dev, uglify(uglifyConfig)))
    // .pipe(remember('scripts-task'))
    .pipe(plumber.stop())
    .pipe(rename(parseName))
    .pipe(gulp.dest(config.scriptOutput))
}

gulp.task('script', script)

gulp.task('script:watch', ['script'])
