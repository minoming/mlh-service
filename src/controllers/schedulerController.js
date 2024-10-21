import schedulerService from '../services/schedulerService.js'

const schedulerController = {
  getSchedulers: async (req, res, next) => {
    try {
      const schedulers = await schedulerService.getSchedulers(req.query)

      res.status(200).send({
        message: 'Success',
        count: schedulers.length,
        list: schedulers
      })
    } catch (err) {
      res.status(400).json({message: err.message})
      console.error(`Error while creating programming language`, err.message)
    }
  },

  getScheduler: async (req, res, next) => {
    try {
      res.status(200).send({
        message: 'Success',
        content: await schedulerService.getScheduler(req.params)
      })
    } catch (err) {
      res.status(400).json({message: err.message})
      console.error(`Error while creating programming language`, err.message)
    }
  },

  postScheduler: async (req, res, next) => {
    class SchedulerDto {
      constructor({name, description, cronExpression}) {
        this.name = name
        this.description = description
        this.cronExpression = cronExpression
        this.status = 'stop'
      }
    }

    try {
      res.status(200).send({
        message: 'Success',
        content: await schedulerService.postScheudler(
          new SchedulerDto(req.body)
        )
      })
    } catch (err) {
      res.status(400).json({message: err.message})
      console.error(`Error while creating programming language`, err.message)
    }
  },

  putScheduler: async (req, res, next) => {
    try {
      res.status(200).send({
        message: 'Success',
        content: await schedulerService.putScheudler({
          ...req.body,
          ...req.params
        })
      })
    } catch (err) {
      res.status(400).json({message: err.message})
      console.error(`Error while creating programming language`, err.message)
    }
  },

  deleteScheduler: async (req, res, next) => {
    try {
      res.status(200).send({
        message: 'Success',
        content: await schedulerService.deleteScheudler(req.params)
      })
    } catch (err) {
      res.status(400).json({message: err.message})
      console.error(`Error while creating programming language`, err.message)
    }
  },

  startScheduler: async (req, res, next) => {
    try {
      res.status(200).send({
        message: 'Success',
        content: await schedulerService.startScheduler(req.params)
      })
    } catch (err) {
      res.status(400).json({message: err.message})
      console.error(`Error while creating programming language`, err.message)
    }
  },

  stopScheduler: async (req, res, next) => {
    try {
      res.status(200).send({
        message: 'Success',
        content: await schedulerService.stopScheduler(req.params)
      })
    } catch (err) {
      res.status(400).json({message: err.message})
      console.error(`Error while creating programming language`, err.message)
    }
  }
}

export default schedulerController
