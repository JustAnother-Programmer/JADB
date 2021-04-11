const authClient = require('./auth-client.js')
const bot = require('../../bot.js')
const cookieParser = require('cookie-parser')

module.exports.updateUser = async (req, res, next) => {
    try {
        const key = req.cookies['userKey']
        if(key)
            res.locals.user = await authClient.getUser(key)
    } finally {
        next()
    }
}

module.exports.validateUser = async (req, res, next) => {
    res.locals.user
        ? next()
        : res.render('errors/401')
}

module.exports.updateGuilds = async (req, res, next) => {
    try {
        const key = req.cookies['userKey']
        if(key) {
            const authGuilds = await authClient.getGuilds(key)
            res.locals.guilds = getManageableGuilds(authGuilds)
        }
    } finally {
        next()
    }
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