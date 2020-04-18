const axios = require('axios');
const cheerio = require('cheerio');
const stopstalk = require('./stopstalk')
const {getMilliSeconds} = require('../utils/timeutils');

const baseURL = 'https://www.codeforces.com/'

function fetchRating(profile) {
  return new Promise((resolve) => {
    let url = baseURL+'profile/'+profile;
    let selector = '.info > ul:nth-child(3) > li:nth-child(1)';
    axios.get(url).then((response) => {
        let $ = cheerio.load(response.data);
        let rating = $(selector).toArray()[0].children[3].children[0].data;
        resolve(rating);
    }).catch((err) => {
        resolve(0);
    })
  })
}

function fetchContests(date, callback) {
  return new Promise(async (resolve) => {
    let url = baseURL+'contests/';
    let rowSelector = '.contests-table > div:nth-child(2) > div:nth-child(6) > table:nth-child(3) > tbody:nth-child(1) > tr';
    axios.get(url).then(async (response) => {
      let $ = cheerio.load(response.data);
      let contestRows = $(rowSelector).toArray();
      contestRows.splice(0, 1);
      let contests = []
      contestRows.forEach((row) => {
        let contest = {
          code: row.attribs['data-contestid'],
          name: row.children[1].children[0].data.trim(),
          startTime: new Date(new Date(row.children[5].children[1].children[0].data+' UTC+3').getTime())
        }
        let duration = getMilliSeconds(row.children[7].children[0].data.trim())
        contest.endTime = new Date(contest.startTime.getTime()+duration);
        if(contest.endTime.getDate() == date.getDate()
          && contest.endTime.getMonth() == date.getMonth()
          && contest.endTime.getFullYear() == date.getFullYear()) {
          contests.push(contest);
        }
      });
      for(let i = 0; i < contests.length; i++) {
        contests[i] = await fetchContestProblems(contests[i])
      }
      resolve(contests);
    })
  })
}

function fetchContestProblems(contest) {
    return new Promise(async (resolve) => {
        let url = baseURL+'contest/'+contest.code
        let rowSelector = '.problems > tbody:nth-child(1) > tr';
        let problems = await axios.get(url).then((response) => {
            let $ = cheerio.load(response.data);
            let problemRows = $(rowSelector).toArray()
            problemRows.splice(0, 1)
            let problems = []
            problemRows.forEach((row) => {
                problems.push(row.children[3].children[1].children[1].children[1].children[1].data)
            });
            return problems;
        })
        contest.problems = problems
        resolve(contest)
    });
}
async function fetchSubmissions(profile, contest, callback) {
  return new Promise(async (resolve) => {
    resolve(await stopstalk.fetchSubmissions('codeforces', profile, contest))
  })
}
module.exports = {fetchRating, fetchContests, fetchSubmissions};