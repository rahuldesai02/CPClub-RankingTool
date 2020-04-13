const scrapper = require('./models/scrapper')
const Promise = require('bluebird')
const AppDAO = require('./models/dao')
const UserRepository = require('./models/user_table')
const contestRepository = require('./models/contests')
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
            codechefid: 'shashikdm',
            codeforceid:'shashikdm'

          },
          {
            name: 'Rahul',
            codechefid: 'rgd1998',
            codeforceid:'rgd1998'
          }
        ]
        return Promise.all(users.map((user) => {
          const { name, codechefid, codeforceid } = user
          return userRepo.create(name, codechefid, codeforceid)
        }))
      })
      .then(() => userRepo.getById(1))
    .then((user) => {
      console.log(`\nRetreived user from database`)
      console.log(`user id = ${user.id}`)
      console.log(`user name = ${user.name}`)
      console.log(`user name = ${user.codechefid}`)
      console.log(`user name = ${user.codeforceid}`)
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
            user_id: 'shashikdm',
            contest_id:1,
            solved:10,
            upsolved:100

          },
          {
            user_id: 'rgd1998',
            contest_id:1,
            solved:3,
            upsolved:14
          }
        ]
        return Promise.all(stats.map((user) => {
          const {user_id, contest_id,solved,upsolved } = user
          return userContestPerformanceRepo.create(user_id, contest_id,solved,upsolved)
        }))
      })
      .then(() => userContestPerformanceRepo.getById(1))
    .then((contest) => {
      console.log(`\nRetreived user from database`)
      console.log(`user id = ${contest.user_id}`)
      console.log(`contest_id = ${contest.contest_id}`)
      console.log(`solved = ${contest.solved}`)
      console.log(`upsolved = ${contest.upsolved}`)
    })
    .catch((err) => {
        console.log('Error: ')
        console.log(JSON.stringify(err))
      })
  }
  testUserContestPerformance()
 
// getCodeChefRating('shashikdm', console.log)
// getCodeForcesRating('shashikdm', console.log)
