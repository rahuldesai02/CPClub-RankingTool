const axios = require('axios');
const cheerio = require('cheerio');
const stopstalk = require('./stopstalk')
const {getMilliSeconds} = require('../utils/timeutils');

const baseURL = 'https://www.codeforces.com/'

async function fetchRating(profile, callback) {
    let url = baseURL+'profile/'+profile;
    let selector = 'span.user-green:nth-child(2)';
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
                startTime: new Date(row.children[5].children[1].children[0].data),
                endTime: new Date(row.children[5].children[1].children[0].data)
            }
            let duration = getMilliSeconds(row.children[7].children[0].data.trim())
            contest.endTime = new Date(contest.endTime.getTime()+duration);
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

function fetchContestProblems(contest) {
    return new Promise(async (resolve) => {
        let url = baseURL+'contest/'+contest.code
        let rowSelector = '.problems > tbody:nth-child(1) > tr';
        await axios.get(url).then((response) => {
            let $ = cheerio.load(response.data);
            let problemRows = $(rowSelector).toArray()
            problemRows.splice(0, 1)
            contest.problems = []
            problemRows.forEach((row) => {
                contest.problems.push(row.children[3].children[1].children[1].children[1].children[1].data)
            });
        })
        resolve(contest)
    });
}
async function fetchSubmissions(profile, contest, callback) {
    let submissions = await stopstalk.fetchSubmissions('codeforces', profile, contest)
    callback(submissions)
}
module.exports = {fetchRating, fetchContests, fetchSubmissions};