import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient({
  // log: ['query', 'info', 'warn', 'error']
  log: ['error']
})

const schedulerLogService = {
  getSchedulerLogs: async (req) => {
    const { limit = 100, schedulerName, message, status, startDate, endDate } = req

    try {
      const foundSchedulerLogs = await prisma.SchedulerLog.findMany({
        take: Number(limit),
        where: {
          ...(schedulerName && { schedulerName: { contains: schedulerName, mode: 'insensitive' } }),
          ...(message && { message: { contains: message, mode: 'insensitive' } }),
          ...(status && { status }),
          ...(startDate && endDate && {
            createdAt: {
              gte: new Date(startDate), // 크거나 같다
              lte: new Date(endDate)    // 작거나 같다
            }
          })
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      return foundSchedulerLogs
    } catch (err) {
      throw err
    }
  },

  getSchedulerLog: async (req) => {
    const { id } = req
    try {
      const foundSchedulerLog = await prisma.SchedulerLog.findUnique({
        where: {
          id: Number(id)
        }
      })
      return foundSchedulerLog
    } catch (err) {
      throw err
    }
  },

  postSchedulerLog: async (req) => {
    const {schedulerName, status, message} = req

    try {
      const createdSchedulerLog = await prisma.SchedulerLog.create({
        data: {
          schedulerName: schedulerName,
          message: message,
          status: status
        }
      })
      return createdSchedulerLog
    } catch (err) {
      throw err
    }
  }
}
export default schedulerLogService
