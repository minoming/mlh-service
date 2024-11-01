import cron from 'node-cron'
import {PrismaClient} from '@prisma/client'
import scheudlerLogService from '../services/scheudlerLogService.js'
import {cronTask} from './cronTask.js'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
})
let taskMap = new Map()

const getTasks = () => {
  const tasks = []

  for (let [name, taskEntry] of taskMap) {
    taskList.push({
      name: name,
      cronExpression: taskEntry.cronExpression,
      isRunning: taskEntry.task.running
    })
  }

  return tasks
}

const createTask = (cronInfo) => {
  const {name, desc, status, cronExpression} = cronInfo || {}

  try {
    const task = cron.schedule(cronExpression, async () => {
      const taskEntry = taskMap.get(name)

      // 점검 실행
      await cronTask(taskEntry)

      scheudlerLogService.postSchedulerLog({
        schedulerName: taskEntry.name,
        status: 'executed',
        message: taskEntry.name + ' scheduler is executed!'
      })
    })

    taskMap.set(name, {name, cronExpression, task})

    if (status === 'stopped') {
      task.stop()
    }

    scheudlerLogService.postSchedulerLog({
      schedulerName: name,
      status: status,
      message: name + ' scheduler is' + status + '!'
    })
  } catch (err) {
    console.log("Error : task create is failed -> " + err.message)
    throw new Error(err.message)
  }
}

const updateTask = () => {}

const deleteTask = () => {}

const startTask = (name) => {
  const taskEntry = taskMap.get(name)
  if (taskEntry) {
    taskEntry.task.start()

    scheudlerLogService.postSchedulerLog({
      schedulerName: name,
      status: 'running',
      message: name + ' scheduler is running!'
    })
  } else {
    console.log('Task is not found and task start is failed')
    throw new Error('Task is not found and task start is failed')
  }
}

const stopTask = (name) => {
  const taskEntry = taskMap.get(name)
  if (taskEntry) {
    taskEntry.task.stop()

    scheudlerLogService.postSchedulerLog({
      schedulerName: name,
      status: 'stopped',
      message: name + ' scheduler is stopped!'
    })
  } else {
    console.log('Task is not found and task stop is failed')
  }
}

export {getTasks, createTask, updateTask, deleteTask, startTask, stopTask}
