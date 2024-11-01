import express from 'express'
import schedulerController from '../controllers/schedulerController.js'

const schedulerRoute = express.Router()

schedulerRoute.use(function timeLog(req, res, next) {
  console.log('scheduler route time: ', Date.now())
  next()
})

// /* GET */
schedulerRoute.get('/', schedulerController.getSchedulers)
schedulerRoute.get('/:id', schedulerController.getScheduler)

// /* POST */
schedulerRoute.post('/', schedulerController.postScheduler)

// /* PATCH */
schedulerRoute.patch('/:id', schedulerController.patchScheduler)

// /* PUT */
schedulerRoute.put('/:id', schedulerController.putScheduler)

// /* DELETE */
schedulerRoute.delete('/:id', schedulerController.deleteScheduler)

export default schedulerRoute
