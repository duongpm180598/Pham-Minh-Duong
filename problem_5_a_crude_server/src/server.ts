import bodyParser from 'body-parser'
import express from 'express'
import connectDB from './config/database'
import user from './routes/user'

const app = express()

connectDB()

app.set('port', 8080)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (_req: any, res: any) => {
    res.send('API Running')
})

app.use('/api/users', user)

const port = app.get('port')
const server = app.listen(port, () => console.log(`Server started on port ${port}`))

export default server
