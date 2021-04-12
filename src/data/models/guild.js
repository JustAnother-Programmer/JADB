const mongoose = require('mongoose')

class GeneralModule {
    prefix = '!'
    blacklistedChannelIDs = []
}

class EconomyModule {
    messageCooldown = 60
    minLength = 5
}

module.exports = mongoose.model('guild', new mongoose.Schema({
    _id: String,
    general: { type: Object, default: new GeneralModule() },
    economy: { type: Object, default: new EconomyModule() }
}))