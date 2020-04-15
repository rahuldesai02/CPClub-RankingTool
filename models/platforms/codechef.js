const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer')
const stopstalk = require('./stopstalk');

const baseURL = 'https://www.codechef.com/'

async function fetchRating(profile, callback) {
    let url = baseURL+'users/'+profile;
    let selector = '.rating-number';
    axios.get(url).then((response) => {
        let $ = cheerio.load(response.data);
        let rating = $(selector).toArray()[0].children[0].data;
        callback(rating);
    }).catch((err) => {
        throw err;
    })
}

async function fetchContests(date, callback) {
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
            && contest.endTime.getFullYear() == date.getFullYear()) {
                contests.push(contest);
            }
        });
        for(let i = 0; i < contests.length; i++) {
            contests[i] = await fetchContestProblems(contests[i])
        }
        callback(contests);
    })
}

async function fetchContestProblems(contest) {
    return new Promise(async (resolve) => {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        let url = baseURL+contest.code
        if(contest.name.includes('Cook-Off') ||
            contest.name.includes('Lunchtime') ||
            contest.name.includes('Challenge')) {
            url = url + 'B'
        }
        await page.goto(url)
        contest.problems = []
        contest = await page.evaluate((contest) => {
            let tableSelector = '.dataTable'
            let tables = document.querySelectorAll(tableSelector)
            try {
                for(let row of tables[0].children[1].children) {
                    contest.problems.push(row.children[1].innerText)
                }
                for(let row of tables[1].children[1].children) {
                    contest.problems.push(row.children[1].innerText)
                }
            } catch(err) {
                console.log(err)
            }
            return contest
        }, contest)
        browser.close()
        resolve(contest)
    })
}

async function fetchSubmissions(profile, contest, callback) {
    let submissions = await stopstalk.fetchSubmissions('codechef', profile, contest)
    callback(submissions)
}

module.exports = {fetchRating, fetchContests, fetchSubmissions};
