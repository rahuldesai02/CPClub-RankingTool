const axios = require('axios');
const cheerio = require('cheerio');

function fetch(url, selector, profile) {
    url = url+profile;
    return new Promise(resolve => axios.get(url).then((response) => {
            let $ = cheerio.load(response.data);
            let rating = $(selector).toArray()[0].children[0].data;
            resolve(rating);
        }).catch((err) => {
            throw err;
        })
    );
}

const platform = Object.freeze({
    CODECHEF: 0,
    CODEFORCES: 1,
});

const data = new Map();
data.set(platform.CODECHEF, {
    url: 'https://www.codechef.com/users/',
    selector: '.rating-number'
});
data.set(platform.CODEFORCES, {
    url: 'https://codeforces.com/profile/',
    selector: 'span.user-green:nth-child(2)'
});

async function fetchRating(platformId, profile, callback) {
    let platformData = data.get(platformId);
    let rating = await fetch(platformData.url, platformData.selector, profile);
    callback(rating);
}

module.exports = {platform, fetchRating};