const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer')
const stopstalk = require('./stopstalk');

const baseURL = 'https://www.codechef.com/'

function fetchRating(profile) {
  return new Promise((resolve) => {
    let url = baseURL+'users/'+profile;
    let selector = '.rating-number';
    axios.get(url).then((response) => {
      let $ = cheerio.load(response.data);
      let rating = $(selector).toArray()[0].children[0].data;
      resolve(rating)
    }).catch((err) => {
      resolve(0);
    })  
  })
}

async function fetchContests(date) {
  return new Promise((resolve) => {
    let url = baseURL+'contests/';
    let rowSelector = '.content-wrapper > div:nth-child(22) > table:nth-child(1) > tbody:nth-child(2) > tr';
    axios.get(url).then(async (response) => {
      let $ = cheerio.load(response.data);
      let contestRows = $(rowSelector).toArray();
      let contests = []
      contestRows.forEach((row) => {
        let contest = {
          code: row.children[1].children[0].data,
          name: row.children[3].children[1].children[0].data,
          startTime: new Date(row.children[5].attribs['data-starttime']),
          endTime: new Date(row.children[7].attribs['data-endtime'])
        }
        if(contest.endTime.getDate() == date.getDate()
        && contest.endTime.getMonth() == date.getMonth()
        && contest.endTime.getFullYear() == date.getFullYear()
        && (contest.name.includes(`Challenge ${contest.startTime.getFullYear()}`)
        || contest.code.includes('COOK') || contest.code.includes('LTIME'))) {
          contests.push(contest);
        }
      });
      for(let i = 0; i < contests.length; i++) {
        contests[i] = await fetchContestProblems(contests[i])
      }
      resolve(contests);
    }).catch((err) => {
      resolve([])
    })
  })
}

async function fetchContestProblems(contest) {
  return new Promise(async (resolve) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    let url = baseURL+contest.code+'B'
    // Enable both JavaScript and CSS coverage
    await Promise.all([
      page.coverage.startJSCoverage(),
      page.coverage.startCSSCoverage()
    ]);
    await page.goto(url, { waitUntil: 'networkidle0' }).catch((reason) => {
      return []
    })
    contest.problems =  await page.evaluate(() => {
      let tableSelector = '.dataTable'
      let tables = document.querySelectorAll(tableSelector)
      let problems = []
      try {
        for(let row of tables[0].children[1].children) {
          problems.push(row.children[1].innerText)
        }
        for(let row of tables[1].children[1].children) {
          problems.push(row.children[1].innerText)
        }
      } finally {
        return problems
      }
    }).catch((err) => {
      console.log(err);
      return []
    })
    const [jsCoverage, cssCoverage] = await Promise.all([
      page.coverage.stopJSCoverage(),
      page.coverage.stopCSSCoverage(),
    ]);
    pti.write([...jsCoverage, ...cssCoverage])
    browser.close()
    resolve(contest)
  })
}

async function fetchSubmissions(profile, contest, callback) {
  return new Promise(async (resolve) => {
    resolve(await stopstalk.fetchSubmissions('codechef', profile, contest))
  })
}

module.exports = {fetchRating, fetchContests, fetchSubmissions};
