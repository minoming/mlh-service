import { PrismaClient } from '@prisma/client'
import { createTask, getTasks, startTask, stopTask } from '../scheduler/cron.js'

const prisma = new PrismaClient({
  // log: ['query', 'info', 'warn', 'error']
  log: ['error']
})

const schedulerService = {
  getSchedulers: async (req) => {
    const { limit = 100, name, description, status, startDate, endDate } = req

    try {
      const foundSchedulers = await prisma.Scheduler.findMany({
        take: Number(limit),
        where: {
          ...(name && { name: { contains: name, mode: 'insensitive' } }),
          ...(description && { description: { contains: description, mode: 'insensitive' } }),
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

      return foundSchedulers
    } catch (err) {
      throw err
    }
  },

  getScheduler: async (req) => {
    const { id } = req
    try {
      const foundScheduler = await prisma.Scheduler.findUnique({
        where: {
          id: Number(id)
        }
      })
      return foundScheduler
    } catch (err) {
      throw err
    }
  },

  postScheduler: async (req) => {
    const { name, description, status = 'stopped', cronExpression } = req

    try {
      // 필수 값 확인
      if(!name || !cronExpression) {
        throw new Error("Required value not found")
      }

      createTask({ name, desc: description, status: status, cronExpression })
      const createdScheduler = await prisma.Scheduler.create({
        data: {
          name: name,
          description: description,
          status: status,
          cronExpression: cronExpression,
          lastExecutionTime: null
        }
      })
      return createdScheduler
    } catch (err) {
      throw err
    }
  },

  // 추후 확인 필요
  putScheudler: async (req) => {
    const { id, name, description, status, cronExpression } = req

    try {
      const updatedScheduler = await prisma.Scheduler.update({
        where: {
          id: Number(id)
        },
        data: {
          name: name,
          description: description,
          status: status,
          cron_expression: cronExpression
        }
      })
      return updatedScheduler
    } catch (err) {
      throw err
    }
  },

  patchScheduler: async (req) => {
    const { id, description, status, cronExpression} = req

    try {
      const foundScheduler = await prisma.Scheduler.findUnique({
        where: {
          id: Number(id)
        }
      })

      if (!foundScheduler) {
        throw new Error('Scheduler not found')
      }

      const updateData = {
        ...(description && { description }),
        ...(status && { status }),
        ...(cronExpression && { cronExpression })
      }

      // status가 기존 status에서 다른 status로 바뀌는 경우
      if (updateData?.status && foundScheduler.status !== updateData.status) {
        updateData.status === 'running' ? startTask(foundScheduler.name) : stopTask(foundScheduler.name)
      }
      
      const updatedScheduler = await prisma.Scheduler.update({
        where: {
          id: Number(id)
        },
        data: updateData,
      })

      return updatedScheduler
    } catch (err) {
      throw err
    }
  },

  deleteScheduler: async (req) => {
    const { id } = req
    try {
      const deletedScheduler = await prisma.Scheduler.delete({
        where: {
          id: Number(id)
        }
      })
      return deletedScheduler
    } catch (err) {
      throw err
    }
  }
}

export default schedulerService
