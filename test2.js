const Promise = require('bluebird')
const AppDAO = require('./models/dao')
const UserRepository = require('./models/user_table')


function test2() {
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
    })
    .catch((err) => {
        console.log('Error: ')
        console.log(JSON.stringify(err))
      })
  }
test2()