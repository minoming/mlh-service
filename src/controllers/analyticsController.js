import analyticsService from '../services/analyticsService.js';

const analyticsController = {
  postAnalytics: async (req, res, next) => {
    try {
      const analyticsData = await analyticsService.analytics(req.body)
      res.status(200).send({
        message: 'Success',
        score: analyticsData.lhr.categories.performance.score * 100,
        content: analyticsData.lhr,
        report: analyticsData.report
      })
    } catch (err) {
      res.status(400).json({ message: err.message })
      console.error(`Error while analytics `, err.message)
    }
  }
}

export default analyticsController
