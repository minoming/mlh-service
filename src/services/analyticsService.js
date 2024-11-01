import * as lighthouse from '../utils/lighthouse.js'

const analyticsService = {
  analytics: async (req) => {
    const { url, mode } = req

    const lightHouseRunnerResult = await lighthouse.run(mode, url)

    return lightHouseRunnerResult
  }
}

export default analyticsService
