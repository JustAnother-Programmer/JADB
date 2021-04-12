const rateLimit = require('express-rate-limit')
const RateLimitStore = require('rate-limit-mongo')

module.exports = rateLimit({
    max: 300,
    message: 'You have reached the limit. You are now being rate limited.',
    store: new RateLimitStore({ uri: process.env.MONGO_URI }),
    windowMs: 60 * 1000
})