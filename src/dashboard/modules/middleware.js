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

module.exports.validateUser = async (req, res, next) => {
    res.locals.user
        ? next()
        : res.render('errors/401')
}