const mongoose = require('mongoose')

class GeneralModule {
    prefix = '!'
    blacklistedChannelIDs = []
}

module.exports = mongoose.model('guild', new mongoose.Schema({
    _id: String,
    general: { type: Object, default: new GeneralModule() }
}))