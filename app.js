import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {PrismaClient} from '@prisma/client'
import {createTask} from './src/scheduler/cron.js'
import analyticsRoute from './src/routes/analyticsRoute.js'
import schedulersRoute from './src/routes/schedulerRoute.js'
import schedulerLogRoute from './src/routes/schedulerLogRoute.js'

const prisma = new PrismaClient({
  // log: ['query', 'info', 'warn', 'error']
  log: ['error']
})

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Hello, This is Miracom LightHouse')
})

app.use('/analytics', analyticsRoute)
app.use('/schedulers', schedulersRoute)
app.use('/schedulerlogs', schedulerLogRoute)

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
  // await initializeTasks()

  app.listen(18177, () => {
    console.log('18177 port is open.')
  })
}

startApp()
