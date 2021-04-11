const OAuthClient = require('disco-oauth')

const client = new OAuthClient(process.env.ID, process.env.SECRET)
client.setRedirect('http://localhost:3000/auth')
client.setScopes('identify', 'guilds')

module.exports = client