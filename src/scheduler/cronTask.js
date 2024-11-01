import { runLighthouse } from "../utils/lighthouse.js";
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
})

export const cronTask = async (taskEntry) => {
  let result = null
  try {
    result = await runLighthouse()
  } catch (error) {
    console.log(error)
    return
  }

  // Performance 지표 가중치
  const performanceMetricsWeight = {
    firstContentfulPaint: 10,       // FCP
    speedIndex: 10,                 // SI
    largestContentfulPaint: 25,     // LCP
    totalBlockingTime: 30,          // TBT
    cumulativeLayoutShift: 25       // CLS
  }

  // Performance 점수 가져오기
  const performanceScore = result.lhr.categories.performance.score * 100;

  // Performance 지표 점수 가져오기
  const performanceMetricsScore = {
    firstContentfulPaint: result.lhr.audits['first-contentful-paint'].score,        //  FCP
    speedIndex: result.lhr.audits['speed-index'].score,                             //  SI
    largestContentfulPaint: result.lhr.audits['largest-contentful-paint'].score,    //  LCP
    totalBlockingTime: result.lhr.audits['total-blocking-time'].score,              //  TBT
    cumulativeLayoutShift: result.lhr.audits['cumulative-layout-shift'].score,      //  CLS
    timeToInteractive: result.lhr.audits['interactive'].score
  };

  // Performance 지표 값 가져오기
  const performanceMetricsValue = {
    firstContentfulPaint: result.lhr.audits['first-contentful-paint'].numericValue,        //  FCP
    speedIndex: result.lhr.audits['speed-index'].numericValue,                             //  SI
    largestContentfulPaint: result.lhr.audits['largest-contentful-paint'].numericValue,    //  LCP
    totalBlockingTime: result.lhr.audits['total-blocking-time'].numericValue,              //  TBT
    cumulativeLayoutShift: result.lhr.audits['cumulative-layout-shift'].numericValue,      //  CLS
    timeToInteractive: result.lhr.audits['interactive'].numericValue
  };

  // 가중치 score 계산
  const performanceMetricsScoreResult = {
    fcpScore: performanceMetricsScore.firstContentfulPaint * performanceMetricsWeight.firstContentfulPaint,
    siScore: performanceMetricsScore.speedIndex * performanceMetricsWeight.speedIndex,
    lcpScore: performanceMetricsScore.largestContentfulPaint * performanceMetricsWeight.largestContentfulPaint,
    tbtScore: performanceMetricsScore.totalBlockingTime * performanceMetricsWeight.totalBlockingTime,
    clsScore: performanceMetricsScore.cumulativeLayoutShift * performanceMetricsWeight.cumulativeLayoutShift
  }

  // 소수점 3자리 value 계산
  const performanceMetricsValueResult = {
    fcpValue: (performanceMetricsValue.firstContentfulPaint / 1000).toFixed(3),
    siValue: (performanceMetricsValue.speedIndex / 1000).toFixed(3),
    lcpValue: (performanceMetricsValue.largestContentfulPaint / 1000).toFixed(3),
    tbtValue: (performanceMetricsValue.totalBlockingTime / 1000).toFixed(3),
    clsValue: (performanceMetricsValue.cumulativeLayoutShift).toFixed(3)
  }

  const fetchedMetricsScores = await fetchPerformanceMetricsScore({
    schedulerName: taskEntry.name,
    performanceScore: performanceScore,
    ...performanceMetricsScoreResult,
    ...performanceMetricsValueResult
  })
}

const fetchPerformanceMetricsScore = async (metricsScoreInfo) => {
  const fetchMetricsScores = await prisma.PerformanceMetricsScore.create({
    data: {
      ...metricsScoreInfo
    }
  })

  return fetchMetricsScores
}