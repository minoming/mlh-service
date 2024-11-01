import schedulerLogService from "../services/scheudlerLogService.js"

const schedulerLogController = {
  getSchedulerLogs: async (req, res, next) => {
    try {
      const schedulers = await schedulerLogService.getSchedulerLogs(req.query)

      res.status(200).send({
        message: 'Success',
        count: schedulers.length,
        list: schedulers
      })
    } catch (err) {
      res.status(400).json({message: err.message})
      console.error(`Error while getting scheduler logs`, err.message)
    }
  },

  getSchedulerLog: async (req, res, next) => {
    try {
      res.status(200).send({
        message: 'Success',
        content: await schedulerLogService.getSchedulerLog(req.params)
      })
    } catch (err) {
      res.status(400).json({message: err.message})
      console.error(`Error while getting scheduler`, err.message)
    }
  },
}

export default schedulerLogController
