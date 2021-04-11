const express = require('express')
const { commands } = require('../../handlers/commandhandler.js')

const router = express.Router()

router.get('/', (req, res) => res.render('dashboard'))

module.exports = router