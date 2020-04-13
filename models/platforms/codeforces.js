const axios = require('axios');
const cheerio = require('cheerio');

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

function getMilliSeconds(time) {
    time = time.split(':').reverse();
    let res = 0;
    let multipliers = [1000*60, 1000*60*60, 1000*60*60*24, 1000*60*60*24*7]
    for(let i = 0; i < time.length; i++) {
        res += multipliers[i]*time[i];
    }
    return res;
}

async function fetchContests(date, callback) {
    let url = baseURL+'contests/';
    let rowSelector = '.contests-table > div:nth-child(2) > div:nth-child(6) > table:nth-child(3) > tbody:nth-child(1) > tr';
    axios.get(url).then((response) => {
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
        callback(contests);
    })
}

module.exports = {fetchRating, fetchContests};