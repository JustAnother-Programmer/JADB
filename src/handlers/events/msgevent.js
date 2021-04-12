const Event = require('./event.js')
const { handleCommand } = require('../commandhandler.js')
const logs = require('../../data/logs.js')

module.exports = class extends Event {
  on = 'message'
  
  async invoke(msg) {
    const command = await handleCommand(msg)
    
    await (command)
      ? await logs.add(msg.guild.id, 'commands')
      : await logs.add(msg.guild.id, 'messages')
  }
}