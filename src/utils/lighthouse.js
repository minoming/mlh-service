import lighthouse from 'lighthouse'
import fs from 'fs'
import util from 'util'
import * as chromeLauncher from 'chrome-launcher'
import puppeteer from 'puppeteer'

async function run(mode, url) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: true
  })

  console.log(
    '새로운 브라우저 인스턴스가 생성되었습니다. 디버깅 포트:',
    browser.wsEndpoint()
  )

  const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance'],
    port: new URL(browser.wsEndpoint()).port,
    artifacts: {
      json: true,
      html: true
    }
  }

  // Puppeteer를 사용하여 Lighthouse 실행
  const runnerResult = await lighthouse(url, options)

  const reportHtml = runnerResult.report
  fs.writeFileSync('lhreport.html', reportHtml)

  await browser.close()

  return runnerResult
}

export {run}
