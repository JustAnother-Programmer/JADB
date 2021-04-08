import Command from './command.js'

export default class extends Command {
    name = 'purge'

    async execute(msg, value) {
        const channel = msg.channel
        channel.bulkDelete(value)
            .then(messages => console.log(`Deleted ${messages.size} messages`))
            .catch(console.error)
    }
}