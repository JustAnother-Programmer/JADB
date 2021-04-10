import { dirname } from 'path'
import { fileURLToPath } from 'url'
import express from 'express'

const app = express()
const port = process.env.PORT || 3000
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.static(__dirname + '/public'))
app.set('views', __dirname + '/public/views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index', {
        subtitle: 'Home'
    })
})

app.get('/commands', (req, res) => {
    res.render('commands', {
        subtitle: 'Commands',
        categories: [
            { name: 'General', icon: 'fas fa-star' },
            { name: 'Economy', icon: 'fas fa-coins' }, 
            { name: 'Administration', icon: 'fas fa-gavel' }, 
            { name: 'Music', icon: 'fas fa-music' }, 
        ],
        commands: [
            { name: 'ping', category: 'General' },
            { name: 'prefix', category: 'General' }
        ]
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})