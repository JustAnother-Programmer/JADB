const Command = require('./command.js')

module.exports = class extends Command {
    name = 'leaderboard'
    category = 'Economy'

    async execute(msg) {
        await msg.reply('Ok! Here is the leaderboard for this guild.' + ' http://localhost:3000/leaderboard/' + msg.guild.id)
    }
}