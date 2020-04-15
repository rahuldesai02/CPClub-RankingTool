const codechef = require('./models/platforms/codechef');
const codeforces = require('./models/platforms/codeforces');
const timeutils = require('./models/utils/timeutils');

// codechef.fetchRating('rgd1998', console.log);
// codeforces.fetchRating('shashikdm', console.log);
let testcf = new Date();
testcf.setDate(13);
testcf.setMonth(4);
testcf.setYear(2019);

codechef.fetchContests(testcf, (contests) => {
    console.log(contests)
    contests.forEach((contest) => codechef.fetchSubmissions('shashikdm', contest, console.log))
});


// codeforces.fetchContests(testcf, (contests) => {
//     console.log(contests)
//     contests.forEach((contest) => codeforces.fetchSubmissions('shashikdm', contest, console.log))
// });