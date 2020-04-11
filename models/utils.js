const axios = require('axios');
const cheerio = require('cheerio');

async function getCodeChefRating(profile, callback){
    const url = 'https://www.codechef.com/users/'+profile
    axios.get(url).then((response) => {
        let $ = cheerio.load(response.data);
        let rating = $('.rating-number').toArray()[0].children[0].data;
        callback(rating)
    }).catch((err) => {
        console.log(err);
    })
}

async function getCodeForcesRating(profile, callback){
    const url = 'https://codeforces.com/profile/'+profile
    axios.get(url).then((response) => {
        let $ = cheerio.load(response.data);
        let rating = $('span.user-green:nth-child(2)').toArray()[0].children[0].data;
        callback(rating)
    }).catch((err) => {
        console.log(err);
    })
}



module.exports = {getCodeChefRating, getCodeForcesRating, getHackerEarthRating};