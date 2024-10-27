import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import homeRouter from './src/routes/homeRoute.js'
import mlhRouter from './src/routes/mlhRoute.js'
import schedulersRouter from './src/routes/schedulerRouter.js'
import {PrismaClient} from '@prisma/client'
import {createTask} from './src/scheduler/cron.js'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
})
const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello, This is Miracom LightHouse')
})
app.use('/home', homeRouter)
app.use('/mlh', mlhRouter)
app.use('/schedulers', schedulersRouter)

const initializeTasks = async () => {
  try {
    const scheduler = await prisma.Scheduler.findMany()

    scheduler.forEach((task) => {
      try {
        createTask({
          name: task.name,
          desc: task.description,
          status: task.status,
          cronExpression: task.cronExpression
        })
      } catch (error) {
        console.error(`Error scheduling task ${task.name}: ${error.message}`)
      }
    })
  } catch (error) {
    console.error('Error fetching scheduler from database:', error)
  }
}

const startApp = async () => {
  await initializeTasks()

  app.listen(18177, () => {
    console.log('18177 port is open.')
  })
}

startApp()
