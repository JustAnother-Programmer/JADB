const { Client } = require('discord.js')
const Command = require('./command.js')

module.exports = class extends Command {
    name = 'ping'

    async execute(msg) {
        await msg.reply(`🏓 Pong! ${Math.round(Client.ws.ping)}ms`)
    }
}