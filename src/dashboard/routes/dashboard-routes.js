const express = require('express')
const bot = require('../../bot.js')

const router = express.Router()

router.get('/dashboard', (req, res) => res.render('dashboard'))

router.get('/servers/:id', (req, res) => res.render('show', { guild: bot.guilds.cache.get(req.params.id) }))

module.exports = router