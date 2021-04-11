const express = require('express')
const cookieParser = require('cookie-parser')

const rootRoutes = require('./routes/root-routes.js')
const authRoutes = require('./routes/auth-routes.js')
const dashboardRoutes = require('./routes/dashboard-routes.js')
const middleware = require('./modules/middleware.js')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))
app.use(cookieParser())
app.set('views', __dirname + '/public/views')
app.set('view engine', 'pug')

app.use('/', middleware.updateUser, rootRoutes, authRoutes)
app.use('/dashboard', middleware.validateUser, dashboardRoutes)

app.get('*', (req, res) => res.render('errors/404'))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})