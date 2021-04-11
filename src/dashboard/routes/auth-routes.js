const express = require('express')
const authClient = require('../modules/auth-client.js')

const router = express.Router()

router.get('/login', (req, res) => res.redirect(`https://discord.com/api/oauth2/authorize?client_id=829407889566728275&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&response_type=code&scope=identify%20guilds`))

router.get('/auth', async (req, res) => {
    try {
        const code = req.query.code
        const key = await authClient.getAccess(code)
        
        res.cookies.set('userKey', key)
        res.redirect('/dashboard')
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

module.exports = router