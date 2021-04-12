const Event = require('./event.js')
const { handleCommand } = require('../commandhandler.js')
const logs = require('../../data/logs.js')
const economy = require('../../modules/economy.js')

module.exports = class extends Event {
  on = 'message'
  
  async invoke(msg) {
    if(!msg.guild || msg.author.bot) return
    
    const command = await handleCommand(msg)
    if ( await command)
      return await logs.add(msg.guild.id, 'commands')
      
    await logs.add(msg.guild.id, 'messages')
    await economy.handleMessage(msg)
  }
}