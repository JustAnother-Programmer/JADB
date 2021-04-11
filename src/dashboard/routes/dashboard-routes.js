const express = require('express')
const bot = require('../../bot.js')
const { validateGuild } = require('../modules/middleware.js')

const router = express.Router()

router.get('/dashboard', (req, res) => res.render('dashboard'))

router.get('/servers/:id', validateGuild, (req, res) => res.render('show'))

module.exports = router