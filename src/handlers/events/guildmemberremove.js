const Event = require('./event.js')
const logs = require('../../data/logs.js')

module.exports = class extends Event {
  on = 'guildMemberRemove'
  
  async invoke(msg) {
      await logs.add(msg.guild.id, 'leaves')
  }
}