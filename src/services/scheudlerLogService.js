import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient({
  // log: ['query', 'info', 'warn', 'error']
})

const schedulerLogService = {
  getSchedulerLogs: async (schedulerLog) => {
    const {
      name = '',
      status = '',
      startDate = '',
      endDate = ''
    } = schedulerLog || {}

    const foundSchedulerLogs = await prisma.SchedulerLog.findMany({
      where: {
        ...(name ? {schedulerName: name} : {}),
        ...(status ? {status: status} : {}),
        ...(start || end
          ? {
              createdAt: {
                ...(start ? {gte: new Date(startDate)} : {}),
                ...(end ? {lte: new Date(endDate)} : {})
              }
            }
          : {})
      },
      take: Number(limit),
      orderBy: {
        createdAt: 'desc'
      }
    })

    return foundSchedulerLogs
  },

  postSchedulerLog: async (schedulerLog) => {
    const {schedulerName = '', status = '', message = ''} = schedulerLog || {}

    const createdSchedulerLog = await prisma.SchedulerLog.create({
      data: {
        schedulerName: schedulerName,
        message: message,
        status: status
      }
    })

    return createdSchedulerLog
  }
}
export default schedulerLogService
