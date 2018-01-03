const yargs = require('yargs')
const path = require('path')

let config = yargs
  .option('dev', {
    boolean: true,
    default: true
  })
  .option('port', {
    string: true,
    default: 3001
  })
  .argv

Object.assign(config, {
  // if PC ["> 5%", "Firefox >= 20",'last 2 versions','IE 7']
  browserVersion: ['iOS >= 7', 'Android >= 4.1'],
  base64Size: 10 * 1024,
  scriptEntery: 'app/script/',
  scriptOutput: 'dist/script/',
  styleEntery: 'app/style/',
  styleOutput: 'dist/style/',
  viewEntery: 'app/view/',
  viewOutput: 'dist/view/',
  imageEntery: 'app/image/',
  imageOutput: 'dist/image/',
})

module.exports = config
