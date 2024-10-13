import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import homeRouter from './src/routes/homeRoute.js'
import mlhRouter from './src/routes/mlhRoute.js'
import schedulersRouter from './src/routes/schedulerRouter.js'
import * as cron from './src/scheduler/cron.js'

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello, This is Miracom LightHouse')
})
app.use('/home', homeRouter)
app.use('/mlh', mlhRouter)
app.use('/schedulers', schedulersRouter)

app.listen(18177, () => {
  console.log('18177 port is open.')
  // cron.start()
})
