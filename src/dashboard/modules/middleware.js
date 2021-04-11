const authClient = require('./auth-client.js')
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