import * as mlhService from '../services/mlhService.js'

// async function patch(req, res, next) {
//   // try {
//   //   res.json(await mlhService.audit("hhhhhp"));
//   // } catch (err) {
//   //   console.error(`Error while getting programming languages`, err.message);
//   //   next(err);
//   // }
// }

const patch = async (req, res, next) => {
  res.json(await mlhService.audit(req))
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
  patch
  // create,
  // update,
  // remove
}
