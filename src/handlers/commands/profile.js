const Command = require('./command.js')
const users = require('../../data/users.js')
const economy = require('../../modules/economy.js')
const canvacord = require('canvacord')

module.exports = class extends Command {
    name = 'profile'

    async execute(msg, mention) {
        const userId = mention
            ?.replace('<@!', '')
            .replace('>', '') ?? msg.author.id
        const user = msg.guild.members.cache.get(userId)?.user
        if (!user)
            throw new TypeError('Member not found')
        
        const savedUser = await users.get(userId)
        const rank = await economy.getRank(userId, msg.guild.id)

        const buffer = await new canvacord.Rank()
            .setAvatar(user.displayAvatarURL({ format: 'png' }))
            .setRank(rank, '#    ', true)
            .setLevel(0, ' ', false)
            .setCurrentXP(savedUser.coins)
            .setBackground('IMAGE', 'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg')
            .setDiscriminator(user.discriminator)
            .setProgressBar('#C5B358', 'COLOR', false)
            .setUsername(user.username)
            .setProgressBarTrack('#000000')
            .setRequiredXP(10_000)
            .build()
        
        await msg.channel.send({
            files: [{
                attachment: buffer,
                name: 'profile.png'
            }]
        })
    }
}