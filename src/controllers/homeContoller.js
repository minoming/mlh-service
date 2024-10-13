import { get as getHome } from '../services/homeService.js';

async function get(req, res, next) {
  try {
    res.json(await getHome());
  } catch (err) {
    console.error(`Error while getting programming languages`, err.message);
    next(err);
  }
}

// async function create(req, res, next) {
//   try {
//     res.json(await homeService.create(req.body));
//   } catch (err) {
//     console.error(`Error while creating programming language`, err.message);
//     next(err);
//   }
// }

// async function update(req, res, next) {
//   try {
//     res.json(await homeService.update(req.params.id, req.body));
//   } catch (err) {
//     console.error(`Error while updating programming language`, err.message);
//     next(err);
//   }
// }

// async function remove(req, res, next) {
//   try {
//     res.json(await homeService.remove(req.params.id));
//   } catch (err) {
//     console.error(`Error while deleting programming language`, err.message);
//     next(err);
//   }
// }

export {
  get
  // create,
  // update,
  // remove
};