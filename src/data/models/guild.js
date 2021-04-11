const mongoose = require('mongoose')

module.exports = mongoose.model('guild', new mongoose.Schema({
    _id: String,
    prefix: { type: String, default: '!' },
}))