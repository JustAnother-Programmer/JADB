const Command = require('./command.js')
const discordjs = require('discord.js')

module.exports = class extends Command {
    name = 'ping'

    execute(message) {
        message.channel.send('Pinging...').then(msg => {
            var ping = msg.createdTimestamp - message.createdTimestamp
            
            var embed = new discordjs.MessageEmbed()
            .setAuthor('JustAnotherDiscordBot')
            .setTitle(`🏓 Pong! ${Math.round(ping)}ms`)
            .setColor(7419530)

            msg.edit(embed)
        })
    }
}