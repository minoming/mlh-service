import express from 'express'
import schedulerLogController from '../controllers/schedulerLogController.js'

const schedulerLogRoute = express.Router()

schedulerLogRoute.use(function timeLog(req, res, next) {
  console.log('scheduler log route time: ', Date.now())
  next()
})

// /* GET */
schedulerLogRoute.get('/', schedulerLogController.getSchedulerLogs)
schedulerLogRoute.get('/:id', schedulerLogController.getSchedulerLog)

export default schedulerLogRoute
