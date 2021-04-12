const mongoose = require('mongoose')

class Profile {
    backgroundURL = 'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg'
    colors = {
        primary: '#000000',
        secondary: '#FFFFFF'
    }
}

module.exports = mongoose.model('user', new mongoose.Schema({
    _id: String,
    profile: { type: Object, default: new Profile() },
    coins: { type: Number, default: 0 }
}))