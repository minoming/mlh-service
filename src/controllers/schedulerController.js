import schedulerService from '../services/schedulerService.js'

const schedulerController = {
  getSchedulers: async (req, res, next) => {
    try {
      if (req.query.status === 'all') {
        req.query.status = ''
      }
      const schedulers = await schedulerService.getSchedulers(req.query)

      res.status(200).send({
        message: 'Success',
        count: schedulers.length,
        list: schedulers
      })
    } catch (err) {
      res.status(400).json({message: err.message})
      console.error(`Error while getting schedulers`, err.message)
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
      console.error(`Error while getting scheduler`, err.message)
    }
  },

  postScheduler: async (req, res, next) => {
    class SchedulerDto {
      constructor({name, description, url, cronExpression}) {
        this.name = name
        this.description = description
        this.cronExpression = cronExpression
        this.status = 'stopped'
        this.url = url
      }
    }

    try {
      res.status(200).send({
        message: 'Success',
        content: await schedulerService.postScheduler(
          new SchedulerDto(req.body)
        )
      })
    } catch (err) {
      res.status(400).json({message: err.message})
      console.error(`Error while creating scheduler`, err.message)
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
      console.error(`Error while modifying scheduler`, err.message)
    }
  },

  patchScheduler: async (req, res, next) => {
    try {
      res.status(200).send({
        message: 'Success',
        content: await schedulerService.patchScheduler({
          ...req.body,
          ...req.params
        })
      })
    } catch (err) {
      res.status(400).json({message: err.message})
      console.error(`Error while modifying scheduler`, err.message)
    }
  },

  deleteScheduler: async (req, res, next) => {
    try {
      res.status(200).send({
        message: 'Success',
        content: await schedulerService.deleteScheduler(req.params)
      })
    } catch (err) {
      res.status(400).json({message: err.message})
      console.error(`Error while deleting scheduler`, err.message)
    }
  }
}

export default schedulerController
