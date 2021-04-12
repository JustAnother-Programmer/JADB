const mongoose = require('mongoose')

module.exports = mongoose.model('log', new mongoose.Schema({
    _id: String,
    changes: { type: Array, default: [] }
}))