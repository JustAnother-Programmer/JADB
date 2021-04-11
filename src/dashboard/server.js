const express = require('express')
const cookies = require('cookies')

const rootRoutes = require('./routes/root-routes.js')
const authRoutes = require('./routes/auth-routes.js')
const middleware = require('./modules/middleware.js')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))
app.set('views', __dirname + '/public/views')
app.set('view engine', 'pug')

app.use(cookies.express('a', 'b', 'c'))

app.use('/', middleware.updateUser, rootRoutes, authRoutes)

app.get('*', (req, res) => res.render('errors/404'))
// END ROUTERS

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})