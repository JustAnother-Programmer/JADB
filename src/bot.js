const dotenv = require('dotenv')
const { Client } = require('discord.js')
const mongoose = require('mongoose')
dotenv.config({ path: '.env' })

const bot = new Client()

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
}, (error) => (error) 
    ? console.log('Failed to connect to JADB database with error: ' + error)
    : console.log('Connected to JADB database.'))

bot.login(process.env.BOT_TOKEN)

module.exports = bot

require('./handlers/eventhandler.js')
require('./dashboard/server.js')