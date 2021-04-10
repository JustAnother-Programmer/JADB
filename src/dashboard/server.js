import { dirname } from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import Cookies from 'cookies'
import OAuthClient from 'disco-oauth'

const app = express()
const port = process.env.PORT || 3000
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.static(__dirname + '/public'))
app.set('views', __dirname + '/public/views')
app.set('view engine', 'pug')

app.use(Cookies.express('a', 'b', 'c'))

// BEGIN DISCORD OAUTH

const Client = new OAuthClient(process.env.ID, process.env.SECRET)
Client.setRedirect('http://localhost:3000/auth')
Client.setScopes('identify', 'guilds')

// END DISCORD OAUTH

// BEGIN ROUTERS
const mainRouter = express.Router()
const authRouter = express.Router()

mainRouter.get('/', (req, res) => res.render('index', { subtitle: 'Home' }))
    
mainRouter.get('/commands', (req, res) => {
    res.render('commands', {
        subtitle: 'Commands',
        categories: [
            { name: 'General', icon: 'fas fa-star' },
            { name: 'Economy', icon: 'fas fa-coins' }, 
            { name: 'Administration', icon: 'fas fa-gavel' }, 
            { name: 'Music', icon: 'fas fa-music' }, 
        ],
        commands: [
            { name: 'Ping', category: 'General' },
            { name: 'Prefix', category: 'General' }
        ]
    })
})

authRouter.get('/login', (req, res) => res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${process.env.ID}&redirect_uri=${process.env.DASHBOARD_URL}/auth&response_type=code&scope=identify%20guilds`))

authRouter.get('/auth', async (req, res) => {
    try {
        const code = req.query.code
        const key = await Client.getAccess(code)
        res.cookies.set('key', key)
        res.redirect('/dashboard')
    } catch (err) {
        res.redirect('/')
    }
})

app.use('/', mainRouter, authRouter)

app.get('*', (req, res) => res.render('errors/404'))
// END ROUTERS

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})