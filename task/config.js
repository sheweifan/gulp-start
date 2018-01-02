const yargs = require('yargs')
const path = require('path')

let config = yargs
  .option('dev', {
    boolean: true,
    default: true
  })
  .option('watch',{
    boolean: true,
    default: true
  })
  .option('port', {
    string: true,
    default: 3000
  })
  .argv

Object.assign({}, config, {
  // output: path(__dirname, '../dist/')
})

console.log(config)
module.exports = config
