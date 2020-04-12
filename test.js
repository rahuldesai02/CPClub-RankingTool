const scrapper = require('./models/scrapper')
scrapper.fetch(scrapper.platform.CODEFORCES, 'shashikdm', console.log);
scrapper.fetch(scrapper.platform.CODECHEF, 'shashikdm', console.log);

// getCodeChefRating('shashikdm', console.log)
// getCodeForcesRating('shashikdm', console.log)
