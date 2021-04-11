const fs = require('fs')
const bot = require('../bot.js')

const fileNames = fs.readdirSync(__dirname + '/events')
for (var fileName of fileNames) {
  const Event = require( __dirname + `/events/${fileName}`)
  const event = new Event()
  if (!event.on) continue

  bot.on(event.on, event.invoke.bind(event))
}
console.log(`Loaded ${fileNames.length - 1} events`)