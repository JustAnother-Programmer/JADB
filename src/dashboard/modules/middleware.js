const sessions = require('./sessions.js')

module.exports.updateUser = async (req, res, next) => {
    try {
        const key = req.cookies['userKey']
        if(key) {
            const { authUser } = await sessions.get(key)
            res.locals.user = authUser
        }
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
            const { guilds } = await sessions.get(key)
            res.locals.guilds = guilds
        }
    } finally {
        next()
    }
}