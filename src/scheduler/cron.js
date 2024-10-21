import cron from 'node-cron'
import {PrismaClient} from '@prisma/client'

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
  const {name, desc, cronExpression} = cronInfo || {}

  try {
    console.log('called?' + name + '-' + cronExpression)
    const task = cron.schedule(cronExpression, async () => {
      console.log('cron task is created and running')
    })
    console.log('set Task: ' + name)
    taskMap.set(name, {cronExpression, task})

    setSchdulerStatus(name, 'running')
  } catch (error) {
    // throw new Error(error.message)
  }
}

const updateTask = () => {}

const deleteTask = () => {}

const startTask = (name) => {
  const taskEntry = taskMap.get(name)
  if (taskEntry) {
    taskEntry.task.start()
    console.log('Task is Started')
    return setSchdulerStatus(name, 'running')
  } else {
    console.log('Task is not found and task start is failed')
  }
}

const stopTask = (name) => {
  const taskEntry = taskMap.get(name)
  if (taskEntry) {
    taskEntry.task.stop()
    console.log('Task is stopped')
    return setSchdulerStatus(name, 'stopped')
  } else {
    console.log('Task is not found and task stop is failed')
  }
}

const setSchdulerStatus = async (name, status) => {
  try {
    const schedulers = await prisma.Scheduler.update({
      where: {
        name: name
      },
      data: {
        status: status
      }
    })

    return schedulers
  } catch (error) {}
}

// const start2 = () => {
//   cron.schedule('*/5 * * * * *', async () => {
//     try {
//       // 작업 수행
//       const logEntry = await prisma.SchedulerLog.create({
//         data: {
//           message: 'Cron job executed successfully',
//           status: 'success'
//         }
//       })
//       console.log('Cron job executed successfully:', logEntry)
//     } catch (error) {
//       await prisma.SchedulerLog.create({
//         data: {
//           message: `Cron job failed: ${error.message}`,
//           status: 'failure'
//         }
//       })
//       console.error('Cron job failed:', error)
//     }
//   })
// }

export {getTasks, createTask, updateTask, deleteTask, startTask, stopTask}
