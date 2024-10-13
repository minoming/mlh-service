import cron from 'node-cron'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const create = (cronInfo) => {
  const {name, desc, express} = cronInfo || {}

  cron.schedule('*/5 * * * * *', async () => {})
}

const start2 = () => {
  cron.schedule('*/5 * * * * *', async () => {
    try {
      // 작업 수행
      const logEntry = await prisma.SchedulerLog.create({
        data: {
          message: 'Cron job executed successfully',
          status: 'success'
        }
      })
      console.log('Cron job executed successfully:', logEntry)
    } catch (error) {
      await prisma.SchedulerLog.create({
        data: {
          message: `Cron job failed: ${error.message}`,
          status: 'failure'
        }
      })
      console.error('Cron job failed:', error)
    }
  })
}

const stop = () => {
  // 작업 정지 로직 (필요시 구현)
}

export {start2, stop}
