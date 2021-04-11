const Event = require('./event.js')
const { handleCommand } = require('../commandhandler.js')

module.exports = class extends Event {
  on = 'message'
  
  invoke(msg) {
    handleCommand(msg)
  }
}