class user_table {
    constructor(dao) {
      this.dao = dao
    }
  
    createTable() {
      console.log("create database");  
      const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,codechefid TEXT,codeforceid TEXT)`
      return this.dao.run(sql)
    }
    create(name, codechefid, codeforceid) {
        console.log("Inserting");
        return this.dao.run(
          `INSERT INTO users (name, codechefid, codeforceid)
            VALUES (?, ?, ?)`,
          [name, codechefid, codeforceid])
      }
      update(user) {
        const { id, name, codechefid, codeforceid} = task
        return this.dao.run(
          `UPDATE users
          SET name = ?,
            codechefid = ?,
            codeforecid = ?
          WHERE id = ?`,
          [name, codechefid, codeforceid, id]
        )
      }
      delete(id) {
        return this.dao.run(
          `DELETE FROM users WHERE id = ?`,
          [id]
        )
      }
      getById(id) {
        return this.dao.get(
          `SELECT * FROM users WHERE id = ?`,
          [id])
      }
      getAll() {
        return this.dao.all(`SELECT * FROM users`)
      }
  }
  
  module.exports = user_table;