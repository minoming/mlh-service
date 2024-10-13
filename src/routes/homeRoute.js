import express from 'express';
import { get } from '../controllers/homeContoller.js';

const homeRouter = express.Router();

homeRouter.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// /* GET */
homeRouter.get('/', get);

// /* POST */
// router.post('/po', homeController.post());

// /* PUT */
// router.put('/:id', homeController.put());

// /* DELETE */
// router.delete('/:id', homeController.delete());


export default homeRouter;