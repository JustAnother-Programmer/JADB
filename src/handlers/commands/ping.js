import { Client } from "discord.js"
import Command from "./command.js"
import Deps from '../../utils/deps.js'

export default class extends Command {
    name = 'ping'

    async execute(msg) {
        await msg.reply(`🏓 Pong! ${Math.round(Deps.get(Client).ws.ping)}ms`)
    }
}