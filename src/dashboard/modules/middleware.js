const authClient = require('./auth-client.js')

module.exports.updateUser = async (req, res, next) => {
    try {
        const key = res.cookies.get('userKey')
        if(key)
            res.locals.user = await authClient.getUser(key)
    } finally {
        next()
    }
}