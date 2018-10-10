const os = require('os')
const chalk = require('chalk')

class Reporter {
  report (messages) {
    const resultsPerFile = this.getResultsPerFile(messages)

    const output = []
    for (const filename in resultsPerFile) {
      const messages = resultsPerFile[filename].messages
      output.push(...messages.map((msg) => msg.message))
    }

    if (output.length > 0) {
      output.push(chalk.red.bold(`\u2716 Errors: ${output.length}`))
      console.log(`${os.EOL}${output.join(`${os.EOL}${os.EOL}`)}${os.EOL}`)
      process.exit(1)
    }
  }

  getResultsPerFile (messages) {
    return messages.reduce((assoc, msg) => {
      assoc[msg.filename] = (msg.filename in assoc) ? assoc[msg.filename] : { messages: [] }
      assoc[msg.filename].messages.push(msg)
      return assoc
    }, {})
  }
}

module.exports = Reporter
