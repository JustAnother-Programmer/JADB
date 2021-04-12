const Event = require('./event.js')
const bot = require('../../bot.js')

module.exports = class extends Event {
  on = 'ready'
  
  invoke() {
    console.log(`Logged in as ${bot.user.username}`)
    
    bot.user.setPresence({
      status: 'online',
      activity: {
        name: 'the dashboard on jadb.xyz',
        type: 'WATCHING'
      }
    })
  }
}