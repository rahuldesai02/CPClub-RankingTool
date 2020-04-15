const scrapper = require('./models/scrapper')
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
 
// getCodeChefRating('shashikdm', console.log)
// getCodeForcesRating('shashikdm', console.log)
