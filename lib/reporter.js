const table = require('text-table')
const chalk = require('chalk')

class Reporter {
  report (messages) {
    const resultsPerFile = this.getResultsPerFile(messages)

    let output = '\n'
    let total = 0

    for (const filename in resultsPerFile) {
      const messages = resultsPerFile[filename].messages
      total += messages.length

      output += chalk.underline(filename) + '\n'
      output += table(messages.map((msg) => {
        return [
          '',
          `${msg.line}:${msg.column}`,
          msg.msg
        ]
      }))

      output += '\n\n'
    }

    if (total > 0) {
      output += chalk.red.bold(`\u2716 problems: ${total}`)
      console.log(output)
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
