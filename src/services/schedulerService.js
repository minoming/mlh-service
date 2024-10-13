import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

const schedulerService = {
  getSchedulers: async (req) => {
    let res = {}

    try {
      const schedulers = await prisma.Scheduler.findMany()

      res.result = 'Success'
      res.count = schedulers.length
      res.list = schedulers

      return res
    } catch (err) {
      throw err
    }
  },

  getScheduler: async (req) => {
    try {
      res.json('1')
    } catch (err) {
      throw err
    }
  },

  postScheudler: async (req) => {
    const {name, description} = req

    const logEntry = await prisma.SchedulerLog.create({
      data: {
        message: 'Cron job executed successfully',
        status: 'success'
      }
    })
  },
  putScheudler: async (req) => {},
  deleteScheudler: async (req) => {}
}

export default schedulerService
