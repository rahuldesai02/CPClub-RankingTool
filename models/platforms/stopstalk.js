const axios = require('axios');
const cheerio = require('cheerio');

const stoptalkURL = 'https://www.stopstalk.com/'

function fetchSubmissions(platform, profile, contest) {
    return new Promise(async (resolve) => {
        let page = 1;
        let submissions = [];
        let rowSelector = '.bordered > tbody:nth-child(2) > tr';
        let finishFlag
        do {
            let url = `${stoptalkURL}user/submissions/${profile}?page=${page}`;
            let nextPageSelector = `.pagination`;
            finishFlag = await axios.get(url).then((response) => {
                let $ = cheerio.load(response.data);
                let submissionRows = $(rowSelector).toArray();
                let finish = false;
                submissionRows.forEach((row) => {
                    let submission = {
                        platform: row.children[1].children[0].attribs['href'].split('.')[1],
                        time: new Date(row.children[2].children[0].data),
                        problem: row.children[3].children[0].children[0].children[0].data,
                        verdict: row.children[5].children[0].attribs['alt']
                    }
                    if(submission.time < contest.endTime) {
                        submission.solve = 'solved';
                    } else {
                        submission.solve = 'upsolved';
                    }

                    if(submission.platform == platform
                        && submission.verdict == 'Accepted' 
                        && contest.problems.includes(submission.problem)) {
                        let duplicate = false
                        for(let i = 0; i < submissions.length(); i++) {
                            if(submission.problem == submissions[i].problem) {
                                duplicate = true
                            }
                        }
                        if(!duplicate) {
                            submissions.push(submission);
                        }
                    }
                    if(submission.time < contest.startTime) {
                        finish = true;
                    }
                });
                return finish; 
            });
            page++;
            if(page == 5) {
                break;
            }
        } while(finishFlag == false);
        resolve(submissions)
    });
}

module.exports = {fetchSubmissions}