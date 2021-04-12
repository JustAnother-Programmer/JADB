const express = require('express')
const bot = require('../../bot.js')
const guilds = require('../../data/guilds.js')
const logs = require('../../data/logs.js')
const log = require('../modules/audit-logger.js')
const { validateGuild } = require('../modules/middleware.js')

const router = express.Router()

router.get('/dashboard', (req, res) => res.render('dashboard'))

router.get('/servers/:id', validateGuild, async (req, res) => res.render('show', {
    savedGuild: await guilds.get(req.params.id),
    savedLog: await logs.get(req.params.id),
    users: bot.users.cache
}))

router.put('/servers/:id/:module', validateGuild, async (req, res) => {
    try {
        const { id, module } = req.params
        const savedGuild = await guilds.get(id)
        
        await log.change(id, {
            module,
            at: new Date(),
            by: res.locals.user.id,
            old: savedGuild[module],
            new: req.body
        })

        savedGuild[module] = req.body
        await savedGuild.save()

        res.redirect(`/servers/${id}`)
    } catch (err) {
        res.render('errors/400')
    }
})

module.exports = router