const Command = require('./command.js')
const guilds = require('../../data/guilds.js')

module.exports = class extends Command {
    name = 'prefix'

    async execute(msg, value) {
        const savedGuild = await guilds.get(msg.guild.id)
        if(!value)
            return await msg.reply(`Prefix is \`${savedGuild.prefix}\``)

        savedGuild.prefix = value
        await savedGuild.save()
        await msg.reply(`Prefix has been changed to\`${value}\``)
    }
}