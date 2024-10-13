import schedulerService from '../services/schedulerService.js'

const schedulerController = {
  getSchedulers: async (req, res, next) => {
    try {
      const result = await schedulerService.getSchedulers(req)
      res.json(result)
    } catch (err) {
      console.error(`Error while creating programming language`, err.message)
    }
  },

  getScheduler: async (req, res, next) => {
    try {
      res.json('get')
    } catch (err) {
      console.error(`Error while creating programming language`, err.message)
    }
  },

  postScheduler: async (req, res, next) => {
    try {
      res.json('post')
    } catch (err) {
      console.error(`Error while creating programming language`, err.message)
    }
  },

  putScheduler: async (req, res, next) => {
    try {
      res.json('put')
    } catch (err) {
      console.error(`Error while creating programming language`, err.message)
    }
  },

  deleteScheduler: async (req, res, next) => {
    try {
      res.json('delete')
    } catch (err) {
      console.error(`Error while creating programming language`, err.message)
    }
  }
}

export default schedulerController
