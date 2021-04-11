const Command = require('./command.js')

module.exports = class extends Command {
    name = 'purge'
    category = 'Administration'

    async execute(msg, value) {
        const channel = msg.channel
        channel.bulkDelete(value)
            .then(messages => console.log(`Deleted ${messages.size} messages`))
            .catch(console.error)
    }
}