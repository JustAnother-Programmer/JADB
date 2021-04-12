const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const rootRoutes = require('./routes/root-routes.js')
const authRoutes = require('./routes/auth-routes.js')
const dashboardRoutes = require('./routes/dashboard-routes.js')
const middleware = require('./modules/middleware.js')
const rateLimit = require('./modules/rate-limiter.js')

const app = express()
const port = process.env.PORT || 3000

app.use(rateLimit)
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(__dirname + '/public'))

app.set('views', __dirname + '/public/views')
app.set('view engine', 'pug')

app.use('/', middleware.updateUser, rootRoutes, authRoutes, middleware.validateUser, middleware.updateGuilds, dashboardRoutes)

app.all('*', (req, res) => res.render('errors/404'))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})