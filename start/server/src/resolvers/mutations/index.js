const { login } = require('./login')
const { sendMessage } = require('./message')

module.exports = {
  Mutation: {
    login,
    sendMessage,
  }
}
