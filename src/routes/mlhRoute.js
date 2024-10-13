import express from 'express'
import * as mlhController from '../controllers/mlhController.js'

const mlhRouter = express.Router()

mlhRouter.use(function timeLog(req, res, next) {
  console.log('mlh route time: ', Date.now())
  next()
})

// /* GET */
// mlhRouter.get('/', get);

// /* POST */
// router.post('/po', homeController.post());

// /* patch */
mlhRouter.patch('/', mlhController.patch)

// /* DELETE */
// router.delete('/:id', homeController.delete());

export default mlhRouter
