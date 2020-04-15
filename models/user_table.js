class user_table {
    constructor(dao) {
      this.dao = dao
    }
  
    createTable() {
      console.log("create database");  
      const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,codechef_id TEXT,codeforce_id TEXT,stopstalk_id TEXT)`
      return this.dao.run(sql)
    }
    create(name, codechef_id, codeforce_id, stopstalk_id) {
        console.log("Inserting");
        return this.dao.run(
          `INSERT INTO users (name, codechef_id, codeforce_id,stopstalk_id)
            VALUES (?, ?, ?, ?)`,
          [name, codechef_id, codeforce_id, stopstalk_id])
      }
      update(user) {
        const { id, name, codechef_id, codeforce_id, stopstalk_id} = task
        return this.dao.run(
          `UPDATE users
          SET name = ?,
            codechef_id = ?,
            codeforecid = ?,
            stopstalk_id = ?
          WHERE id = ?`,
          [name, codechef_id, codeforce_id, stopstalk_id, id]
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