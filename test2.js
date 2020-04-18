const Promise = require('bluebird')
const AppDAO = require('./models/dao')
const UserRepository = require('./models/user_table')
const contestRepository = require('./models/contests')
const userStatRepository = require('./models/user_stats')
const userContestPerformanceRepository = require('./models/user_contest_performance')
const dao = new AppDAO('./database.sqlite3')
const userRepo = new UserRepository(dao)
const userStatRepo = new userStatRepository(dao)
const userContPerfRepo =  new userContestPerformanceRepository(dao)

  let user1 = {
            id: 1,
            name: 'Shashikant',
            codechef_id: 'shashikdm',
            codeforce_id:'shashikdm',
            stopstalk_id:'sk'
          };
  let stat1 = {
                id:1,
                date: '4545454',
                user_id: 1,
                codechef_rank:1234,
                codeforce_rank:3433
              }
  let perfo1 = {
                id:1,
                user_id: 1,
                platform: 0,
                contest_code:'sdsds',
                solved:10,
                upsolved:100,
                total:123
              }
  
  describe('Test User', () => {
    it('should return User Details', async () => {
      let utable = await userRepo.createTable();
      const { name, codechef_id, codeforce_id,stopstalk_id } = user1;
      let us = await userRepo.create(name, codechef_id, codeforce_id,stopstalk_id);
      let user = await userRepo.getById(1);
      assert.deepEqual(user, user1);
    }).timeout(60000)
  })
  describe('Test User stats', () => {
    it('should return User stat details', async () => {
      let ustable = await userStatRepo.createTable();
      const { date, user_id, codechef_rank, codeforce_rank } = stat1;
      let us = await userStatRepo.create(date, user_id, codechef_rank, codeforce_rank);
      let stat = await userStatRepo.getById(1);
      assert.deepEqual(stat, stat1);
    }).timeout(60000)
  })
  describe('Test User Performance', () => {
    it('should return User Performance Details', async () => {
      let utable = await userContPerfRepo.createTable();
      const {user_id, platform,contest_code,solved,upsolved,total} = perfo1;
      let us = await userContPerfRepo.create(user_id, platform,contest_code,solved,upsolved,total);
      let perfo = await userContPerfRepo.getById(1);
      assert.deepEqual(perfo, perfo1);
    }).timeout(60000)
  })
  