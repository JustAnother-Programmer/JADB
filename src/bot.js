import { config } from 'dotenv'
import { Client } from 'discord.js'
import { EventHandler } from './handlers/eventhandler.js'
import Deps from './utils/deps.js'
import mongoose from 'mongoose'
config({ path: '.env' })

export const bot = Deps.add(Client, new Client())

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
}, (error) => (error) 
    ? console.log('Failed to connect to JADB database with error ' + error)
    : console.log('Connected to JADB database.'))

Deps.get(EventHandler).init()

bot.login(process.env.BOT_TOKEN)