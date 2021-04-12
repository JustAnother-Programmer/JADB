const fs = require('fs')
const guilds = require('../data/guilds.js')

const commands = new Map()

const fileNames = fs.readdirSync(__dirname + '/commands')
for (let fileName of fileNames) {
  const Command = require( __dirname + `/commands/${fileName}`)
  const command = new Command()
  if (!command.name) continue

  commands.set(command.name, command)
}
console.log(`Loaded ${commands.size} commands`)

async function handleCommand(msg) {
  const savedGuild = await guilds.get(msg.guild.id)
  const prefix = savedGuild.general.prefix

  const channelIsBlacklisted = savedGuild.general.blacklistedChannelIDs.includes(msg.channel.id)

  if(channelIsBlacklisted) return

  if (!msg.content.startsWith(prefix)) return

  const name = msg.content
    .split(' ')[0]
    .slice(prefix.length)

  const args = msg.content
    .split(' ')
    .slice(1)

  const command = commands.get(name)
  try {
    await command?.execute(msg, ...args)
  }
  catch (error) {
    await msg.channel.send(`⚠ ${error?.message ?? 'Unknown error.'}`)
  }

  return command
}

module.exports.handleCommand = handleCommand
module.exports.commands = commands