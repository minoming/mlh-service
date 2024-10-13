import * as lighthouse from '../utils/lighthouse.js'

import {PrismaClient} from '@prisma/client'

const audit = async (req) => {
  let res = {}
  res.result = 'Success'
  res.message = req.body.url

  const mode = req.body.mode
  const url = req.body.url

  const lightHouseRunnerResult = await lighthouse.run(mode, url)
  res.score = lightHouseRunnerResult.lhr.categories.performance.score * 100
  res.json = lightHouseRunnerResult.lhr
  res.report = lightHouseRunnerResult.report
  return res
}

const postData = async (req) => {
  const prisma = new PrismaClient()

  const newData = await prisma.infotable.create({
    data: {
      data1: 'John Doe',
      data2: 'john.doe@example.com'
    }
  })

  console.log(newData)

  let res = {}
  res.result = 'Success'
  res.message = 'create data is success'

  return res
}

export {audit, postData}
