const express = require('express')
const cookieParser = require('cookie-parser')
const authClient = require('../modules/auth-client.js')

const router = express.Router()

router.get('/invite', (req, res) => res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${process.env.ID}&redirect_uri=${process.env.DASHBOARD_URL}/dashboard&response_type=code&scope=bot`))

router.get('/login', (req, res) => res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${process.env.ID}&redirect_uri=${process.env.DASHBOARD_URL}/auth&response_type=code&scope=identify%20guilds`))

router.get('/auth', async (req, res) => {
    try {
        const code = req.query.code
        const key = await authClient.getAccess(code)

        res.cookie('userKey', key)
        res.redirect('/dashboard')
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.get('/logout', (req, res) => {
    res.cookie('userKey', '')
    
    res.redirect('/')
})

module.exports = router