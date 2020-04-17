const assert = require('assert')
const codechef = require('./models/platforms/codechef');
const codeforces = require('./models/platforms/codeforces');


describe('Scrapper', () => {
  describe('Fetch Rating', () => {
    it('should return codechef shashikdm rating', async () => {
      let rank = await codechef.fetchRating('shashikdm')
      assert.notEqual(rank, 0);
    }).timeout(15000)
    it('should return codechef elibfeedback rating', async () => {
      let rank = await codechef.fetchRating('elibfeedback');
      assert.equal(rank, 0);
    }).timeout(15000)
    it('should return codechef impossiblename rating', async () => {
      let rank = await codechef.fetchRating('impossiblename');
      assert.equal(rank, 0);
    }).timeout(15000)
    it('should return codeforces shashikdm rating', async () => {
      let rank = await codeforces.fetchRating('tourist');
      assert.notEqual(rank, 0);
    }).timeout(15000)
    it('should return codeforces elibfeedback rating', async () => {
      let rank = await codeforces.fetchRating('elibfeedback');
      assert.equal(rank, 0);
    }).timeout(15000)
    it('should return codeforces impossiblename rating', async () => {
      let rank = await codeforces.fetchRating('impossiblename');
      assert.equal(rank, 0);
    }).timeout(15000)
  })
  let NOV19 = {
    code: 'NOV19',
    name: 'November Challenge 2019',
    startTime: new Date('2019-11-01T15:00:00+05:30'),
    endTime: new Date('2019-11-11T15:00:00+05:30'),
    problems: [
      'SC31', 'HRDSEQ', 'PHCUL', 'CAMC', 'WEIRDO', 'LSTBTF', 'FAILURE', 'TRICOL',
      'MDSWIN', 'PBOXES', 'DDART'
    ]
  }
  let  COOK114 = {
    code: 'COOK114',
    name: 'January Cook-Off 2020',
    startTime: new Date('2020-01-19T21:30:00+05:30'),
    endTime: new Date('2020-01-20T00:00:00+05:30'),
    problems: ['CHFCHK', 'EXAMCHT', 'RGAND', 'PRT', 'CFINASUM', 'PLIND', 'CNTIT']
  }
  let LTIME82 = {
    code: 'LTIME82',
    name: 'March Lunchtime 2020 (Unrated)',
    startTime: new Date('2020-03-28T19:30:00+05:30'),
    endTime: new Date('2020-03-28T21:15:00+05:30'),
    problems: ['SWPDGT', 'PRFXGD', 'MXMLCM', 'STRPTRE', 'NSTROT', 'RNDRATIO', 'SCRRCP']
  }
  let CR625 = [
    {
      code: '1320',
      name: 'Codeforces Round #625 (Div. 1, based on Technocup 2020 Final Round)',
      startTime: new Date('2020-03-01T10:45:00.000Z'),
      endTime: new Date('2020-03-01T12:45:00.000Z'),
      problems: [
        'Journey Planning',
        'Navigation System',
        'World of Darkraft: Battle for Azathoth',
        'Reachable Strings',
        'Treeland and Viruses',
        'Blocks and Sensors'
      ]
    },
    {
      code: '1321',
      name: 'Codeforces Round #625 (Div. 2, based on Technocup 2020 Final Round)',
      startTime: new Date('2020-03-01T10:45:00.000Z'),
      endTime: new Date('2020-03-01T12:45:00.000Z'),
      problems: [
        'Contest for Robots',
        'Journey Planning',
        'Remove Adjacent',
        'Navigation System',
        'World of Darkraft: Battle for Azathoth',
        'Reachable Strings'
      ]
    }
  ]
  
  describe('Fetch Contests', () => {
    it('should return November Challenge 2019', async () => {
      let contests = await codechef.fetchContests(new Date(2019, 10, 11));
      assert.deepEqual(contests, [NOV19])
    }).timeout(60000)
    it('should return January Cook-Off 2020', async () => {
      let contests = await codechef.fetchContests(new Date(2020, 0, 20));
      assert.deepEqual(contests, [COOK114])
    }).timeout(60000)
    it('should return March Lunchtime 2020 (Unrated)', async () => {
      let contests = await codechef.fetchContests(new Date(2020, 2, 28));
      assert.deepEqual(contests, [LTIME82])
    }).timeout(60000)
    it('should return Empty array', async () => {
      assert.equal((await codechef.fetchContests(new Date(2020, 4, 10))).length, 0);
    }).timeout(60000)
    it('should return Codeforces Round #625', async () => {
      let contests = await codeforces.fetchContests(new Date(2020, 2, 1))
      assert.deepEqual(contests, CR625)
    }).timeout(60000)
    it('should return Empty array', async () => {
      assert.equal((await codeforces.fetchContests(new Date(2020, 2, 16))).length, 0)
    }).timeout(60000)
  })
  let COOK116 = {
    code: 'COOK116',
    name: 'March Cook-Off 2020',
    startTime: new Date('2020-03-22T16:00:00.000Z'),
    endTime: new Date('2020-03-22T18:30:00.000Z'),
    problems: [
      'GIFTSRC', 'CHCBOX',
      'MYSARA',  'MAXBTY',
      'ESCTRE',  'RANDCHCL',
      'TRERMB'
    ]
  }
  describe('Fetch Submissions', () => {
    it('should return whatever', async () => {
      let submissions = await codechef.fetchSubmissions('shashikdm', COOK116)
      assert.notEqual(submissions, undefined);
    }).timeout(60000)
    it('should return whatever', async () => {
      let submissions = await codeforces.fetchSubmissions('shashikdm', COOK116)
      assert.equal(submissions.length, 0);
    }).timeout(60000)
  })
})
/*
const Promise = require('bluebird')
const AppDAO = require('./models/dao')
const UserRepository = require('./models/user_table')
const contestRepository = require('./models/contests')
const userStatRepository = require('./models/user_stats')
const userContestPerformanceRepository = require('./models/userContestPerformances')

scrapper.fetch(scrapper.platform.CODEFORCES, 'shashikdm', console.log);
scrapper.fetch(scrapper.platform.CODECHEF, 'shashikdm', console.log);
scrapper.fetch(scrapper.platform.CODECHEF, 'rgd1998', console.log);

function testUser() {
    const dao = new AppDAO('./database.sqlite3')
    const userRepo = new UserRepository(dao)
    userRepo.createTable()
      .then(() => userRepo.createTable())
      .then((data) => {
        const users = [
          {
            name: 'Shashikant',
            codechef_id: 'shashikdm',
            codeforce_id:'shashikdm',
            stopstalk_id:'sk'
          },
          {
            name: 'Rahul',
            codechef_id: 'rgd1998',
            codeforce_id:'rgd1998',
            stopstalk_id:'rgd'
          }
        ]
        return Promise.all(users.map((user) => {
          const { name, codechef_id, codeforce_id,stopstalk_id } = user
          return userRepo.create(name, codechef_id, codeforce_id,stopstalk_id)
        }))
      })
      .then(() => userRepo.getById(1))
    .then((user) => {
      console.log(`\nRetreived user from database`)
      console.log(`user id = ${user.id}`)
      console.log(`user name = ${user.name}`)
      console.log(`user name = ${user.codechef_id}`)
      console.log(`user name = ${user.codeforce_id}`)
      console.log(`user name = ${user.stopstalk_id}`)
    })
    .catch((err) => {
        console.log('Error: ')
        console.log(JSON.stringify(err))
      })
  }

  function testUserStats() {
    const dao = new AppDAO('./database.sqlite3')
    const userRepo = new userStatRepository(dao)
    userRepo.createTable()
      .then(() => userRepo.createTable())
      .then((data) => {
        const users = [
          {
            date: '4545454',
            user_id: 1,
            codechef_rank:1234,
            codeforce_rank:3433
          }
        ]
        return Promise.all(users.map((user) => {
          const { date, user_id, codechef_rank, codeforce_rank } = user
          return userRepo.create(date, user_id, codechef_rank, codeforce_rank)
        }))
      })
      .then(() => userRepo.getById(1))
    .then((user) => {
      console.log(`\nRetreived user from database`)
      console.log(`id = ${user.id}`)
      console.log(`date = ${user.date}`)
      console.log(`rank1 = ${user.codechef_rank}`)
      console.log(`rank2 = ${user.codeforce_rank}`)
      console.log(`id = ${user.user_id}`)
    })
    .catch((err) => {
        console.log('Error: ')
        console.log(JSON.stringify(err))
      })
  }

  function testContest() {
    const dao = new AppDAO('./database.sqlite3')
    const contest = new contestRepository(dao)
    contest.createTable()
      .then(() => contest.createTable())
      .then((data) => {
        const users = [
          {
            date: '02117998',
            platform: 'codechef',
            link:'www.com'

          },
          {
            date: '5656325',
            platform: 'codechef',
            link:'httpwww.com'
          }
        ]
        return Promise.all(users.map((user) => {
          const { date, platform, link } = user
          return contest.create(date, platform, link)
        }))
      })
      .then(() => contest.getById(1))
    .then((contest) => {
      console.log(`\nRetreived user from database`)
      console.log(`user id = ${contest.id}`)
      console.log(`user date = ${contest.date}`)
      console.log(`user date = ${contest.platform}`)
      console.log(`user date = ${contest.link}`)
    })
    .catch((err) => {
        console.log('Error: ')
        console.log(JSON.stringify(err))
      })
  }
  function testUserContestPerformance() {
    const dao = new AppDAO('./database.sqlite3')
    const userContestPerformanceRepo = new userContestPerformanceRepository(dao)
    userContestPerformanceRepo.createTable()
      .then(() => userContestPerformanceRepo.createTable())
      .then((data) => {
        const stats = [
          {
            user_id: 1,
            platform: 0,
            contest_code:'sdsds',
            solved:10,
            upsolved:100,
            total:123
          }
        ]
        return Promise.all(stats.map((user) => {
          const {user_id, platform,contest_code,solved,upsolved,total } = user
          return userContestPerformanceRepo.create(user_id, platform,contest_code,solved,upsolved,total)
        }))
      })
      .then(() => userContestPerformanceRepo.getById(1))
    .then((contest) => {
      console.log(`\nRetreived user from database`)
      console.log(`user id = ${contest.user_id}`)
      console.log(`platform = ${contest.platform}`)
      console.log(`solved = ${contest.solved}`)
      console.log(`upsolved = ${contest.upsolved}`)
      console.log(`code = ${contest.code}`)
      console.log(`total = ${contest.total}`)
    })
    .catch((err) => {
        console.log('Error: ')
        console.log(JSON.stringify(err))
      })
  }
  testUserContestPerformance()
  */