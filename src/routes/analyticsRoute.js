import express from 'express'
import analyticsController from '../controllers/analyticsController.js'

const analyticsRoute = express.Router()

analyticsRoute.use(function timeLog(req, res, next) {
  console.log('analytics route time: ', Date.now())
  next()
})

// /* POST */
analyticsRoute.post('/', analyticsController.postAnalytics)

export default analyticsRoute

