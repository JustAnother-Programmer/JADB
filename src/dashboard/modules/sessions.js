const sessions = new Map()
const authClient = require('./auth-client.js')
const bot = require('../../bot.js')

function get(key) {
    return sessions.get(key) ?? create(key)
}

async function create(key) {
    setTimeout(() => sessions.delete(key), 5 * 60 * 1000)
    await update(key)

    return sessions.get(key)
}

async function update(key) {
    return sessions
        .set(key, {
            authUser: await authClient.getUser(key),
            guilds: getManageableGuilds(await authClient.getGuilds(key))
        })
}

function getManageableGuilds(authGuilds) {
    const guilds = []
    for (const id of authGuilds.keys()) {
        const hasPermissions = authGuilds
            .get(id).permissions
            .includes('MANAGE_GUILD')
        
        const guild = bot.guilds.cache.get(id)
        if(!guild || !hasPermissions) continue

        guilds.push(guild)
    }
    return guilds
}

module.exports.get = get
module.exports.update = update