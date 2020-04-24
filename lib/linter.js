const walk = require('walk')
const fs = require('fs')
const os = require('os')
const path = require('path')
const htmlparser = require('htmlparser2')
const cheerio = require('cheerio')
const PugLint = require('pug-lint')
const pugLintConfigFile = require('pug-lint/lib/config-file')
const Reporter = require('./reporter.js')

class Linter {
  constructor (options) {
    this.lintErrors = []
    this.pugLinter = new PugLint()

    const pugLinterConfig = pugLintConfigFile.load(options.config)
    this.pugLinter.configure(pugLinterConfig)
  }

  checkPaths (pathsToCheck) {
    pathsToCheck.forEach((pathToCheck) => {
      this.checkPath(pathToCheck)
    })
  }

  checkPath (arg) {
    const walker = walk.walk(arg, { followLinks: false })
    walker.on('file', this.walkerFileHandler.bind(this))
    walker.on('end', this.walkerEndHandler.bind(this))
  }

  walkerFileHandler (root, fileStat, next) {
    const filename = `${root}/${fileStat.name}`

    if (filename.substr(-3) !== 'vue') {
      return next()
    }

    fs.readFile(path.resolve(root, fileStat.name), (error, fileData) => {
      if (error) {
        return console.log(error)
      }

      const fileTemplates = this.extractFileTemplates(fileData)

      fileTemplates.forEach((template) => {
        // Remove first and last line-break, as these contain the opening /
        // closing <template> tag expressions and should not count as empty
        // lines.
        const text = template.match(/^[\r\n|\n|\r]?([\s\S]*?)[\r\n|\n|\r]?$/)[1]
        const fileErrors = this.pugLinter.checkString(text, filename)
        this.lintErrors = this.lintErrors.concat(fileErrors)
      })

      next()
    })
  }

  walkerEndHandler () {
    const reporter = new Reporter()
    reporter.report(this.lintErrors)
  }

  extractFileTemplates (fileData) {
    const content = fileData.toString()
    const templates = []

    const handler = new htmlparser.DefaultHandler((error, dom) => {
      if (error) {
        return console.log(error)
      }

      const $ = cheerio.load(dom)
      const text = $('template[lang="pug"]').text()
      // Determine the amount of lines before the <template> block
      const start = content.indexOf(text)
      const lines = content.substring(0, start).split(/[\r\n|\n|\r]/g).length
      // Insert empty root-level divs on each line, so that code-errors are in
      // the right offset, and indentation doesn't trigger errors.
      templates.push(`${Array(lines).join(`div${os.EOL}`)}div${text}`)
    })

    var parser = new htmlparser.Parser(handler)
    parser.parseComplete(content)
    return templates
  }
}

module.exports = Linter
