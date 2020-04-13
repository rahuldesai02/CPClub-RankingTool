const axios = require('axios');
const cheerio = require('cheerio');

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
    axios.get(url).then((response) => {
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
        callback(contests);
    })
}

module.exports = {fetchRating, fetchContests};