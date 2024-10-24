import express from 'express'
import schedulerController from '../controllers/schedulerController.js'

const schedulerRouter = express.Router()

schedulerRouter.use(function timeLog(req, res, next) {
  console.log('scheduler route time: ', Date.now())
  next()
})

// /* GET */
schedulerRouter.get('/', schedulerController.getSchedulers)
schedulerRouter.get('/:id', schedulerController.getScheduler)

// /* POST */
schedulerRouter.post('/', schedulerController.postScheduler)

// /* patch */
// schedulerRouter.patch('/:id', schedulerController.)
schedulerRouter.patch('/start/:id', schedulerController.startScheduler)
schedulerRouter.patch('/stop/:id', schedulerController.stopScheduler)

// /* put */
schedulerRouter.put('/:id', schedulerController.putScheduler)

// /* DELETE */
schedulerRouter.delete('/:id', schedulerController.deleteScheduler)

export default schedulerRouter
