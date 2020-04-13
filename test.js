const codechef = require('./models/platforms/codechef');
const codeforces = require('./models/platforms/codeforces');

codechef.fetchRating('rgd1998', console.log);
codeforces.fetchRating('shashikdm', console.log);
let testDate = new Date();
testDate.setDate(12);
testDate.setMonth(3);
testDate.setYear(2020);
codechef.fetchContests(testDate, console.log);
codeforces.fetchContests(testDate, console.log);

