import {PrismaClient} from '@prisma/client'
import {createTask, getTasks, startTask, stopTask} from '../scheduler/cron.js'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
})

const schedulerService = {
  getSchedulers: async (req) => {
    const {limit} = req

    try {
      const foundSchedulers = await prisma.Scheduler.findMany({
        take: Number(limit)
      })
      return foundSchedulers
    } catch (err) {
      throw err
    }
  },

  getScheduler: async (req) => {
    const {id} = req
    try {
      const foundScheduler = await prisma.Scheduler.findUnique({
        where: {
          id: Number(id)
        }
      })
      return foundScheduler
    } catch (error) {
      throw error
    }
  },

  postScheudler: async (req) => {
    const {name, description, status, cronExpression} = req

    try {
      createTask(name, description, cronExpression)
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
    } catch (error) {
      console.log('postScheduler is failed -> ' + error)
    }
  },

  putScheudler: async (req) => {
    const {id, name, description, status, cronExpression} = req

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
    } catch (err) {}
  },

  deleteScheudler: async (req) => {
    const {id} = req
    try {
      const deletedScheduler = await prisma.Scheduler.delete({
        where: {
          id: Number(id)
        }
      })
      return deletedScheduler
    } catch (error) {
      throw error
    }
  },

  startScheduler: async (req) => {
    const {id} = req
    try {
      const scheduler = await prisma.Scheduler.findUnique({
        where: {
          id: Number(id)
        }
      })
      return startTask(scheduler.name)
    } catch (error) {
      throw error
    }
  },
  stopScheduler: async (req) => {
    const {id} = req
    try {
      const scheduler = await prisma.Scheduler.findUnique({
        where: {
          id: Number(id)
        }
      })
      return stopTask(scheduler.name)
    } catch (error) {
      throw error
    }
  }
}

export default schedulerService
