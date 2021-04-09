import { dirname } from 'path'
import { fileURLToPath } from 'url'
import express from 'express'

const app = express()
const port = process.env.PORT || 3000
const __dirname = dirname(fileURLToPath(import.meta.url))

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index', {
        subtitle: 'Home'
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})