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

async function runLighthouse() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--start-fullscreen', '--no-sandbox', '--disable-setuid-sandbox'] // 전체 화면으로 시작
  })

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  await login(page, 'https://mdev.miracom-inc.com/mes', 'admin', 'manager')

  const jwt = await getJwt(page)
  console.log(jwt)

  const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance'],
    port: new URL(browser.wsEndpoint()).port,
    artifacts: {
      json: true,
      html: true
    },
    formFactor: 'desktop',
    screenEmulation: {
      mobile: false,
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      horizontalScroll: true
    }
  }

   // Puppeteer를 사용하여 Lighthouse 실행
   const runnerResult = await lighthouse('https://mdev.miracom-inc.com/mes', options)

   const reportHtml = runnerResult.report
   fs.writeFileSync('lhreport.html', reportHtml)
 
   await browser.close()

   return runnerResult
}

/**
 * 특정 web에 로그인한다.
 * @param {*} page puppeteer page
 * @param {*} url 접속하는 rul
 * @param {*} user 접속하는 user name
 * @param {*} pw 접속하는 user password
 */
async function login (page, url, user, pw) {
  await page.goto(url)

  await page.type('#username', user)
  await page.type('#password', pw)
  await page.click('#login_buttonLogin')

  await page.waitForNavigation('domcontentloaded')
}

/**
 * 접속한 page에서 jwt 정보를 가져온다.
 * @param {*} page puppeteer page
 * @returns 
 */
async function getJwt (page) {
  const jwt = await page.evaluate(() => {
    return localStorage.getItem('jwt')
  });

  return jwt
}

export {run, runLighthouse}
