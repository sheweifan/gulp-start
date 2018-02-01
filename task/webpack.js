const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
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

let webpackConfig = {
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
        test: /\.(pug)$/,
        use: ['pug-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: config.base64Size
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  externals: {
    $: 'window.$'
  }
}

if (dev) {
  webpackConfig.devtool = 'cheap-source-map'
  webpackConfig.module.rules.push({
    test: /\.(styl|css)$/i,
    use: [
      'style-loader',
      'css-loader',
      'stylus-loader'
    ],
  })
} else {
  webpackConfig.module.rules.push({
    test: /\.(styl|css)$/i,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            autoprefixer({
              browsers: config.browserVersion,
              remove: true
            })
          ]
        }
      },
      'stylus-loader'
    ],
  })
}

module.exports = webpackConfig
