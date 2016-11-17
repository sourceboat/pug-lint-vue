#!/usr/bin/env node
const program = require('commander')
const packageDetails = require('./../package.json')
const Linter = require('./linter.js')

const run = (args) => {
  program
    .version(packageDetails.version)
    .description(packageDetails.description)
    .usage('[options] <paths ...>')
    .arguments('<paths>')
    .option('-c, --config <path>', 'configuration file path')
    .parse(process.argv)

  if (!program.args.length) {
    program.help()
  }

  const linter = new Linter({
    config: program.config
  })

  linter.checkPaths(program.args)
}

module.exports = run
