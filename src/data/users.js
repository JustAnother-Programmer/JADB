const bot = require('../bot.js')
const guild = require('./models/guild.js')
const SavedUser = require('./models/user.js')

module.exports = new class {
    async get(id) {
        return await SavedUser.findById(id)
            ?? await SavedUser.create({ _id : id })
    }

    async getInGuild(guildId) {
        const guild = bot.guilds.cache.get(guildId)
        const userIds = guild.members.cache.map(m => m.id)

        return await SavedUser.find({ _id: userIds })
    }
}