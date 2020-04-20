class user_table {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    console.log("create database");  
    const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE,codechef_id TEXT,codeforce_id TEXT,stopstalk_id TEXT,status INTEGER)`
    return this.dao.run(sql)
  }
  create(name, codechef_id, codeforce_id, stopstalk_id,status) {
      console.log("Inserting");
      return this.dao.run(
        `INSERT or IGNORE INTO users (name, codechef_id, codeforce_id,stopstalk_id,status)
          VALUES (?, ?, ?, ?, ?)`,
        [name, codechef_id, codeforce_id, stopstalk_id,status])
    }
  update(user) {
    const { id, name, codechef_id, codeforce_id, stopstalk_id,status} = task
    return this.dao.run(
      `UPDATE users
      SET name = ?,
        codechef_id = ?,
        codeforecid = ?,
        stopstalk_id = ?,
        status = ?
      WHERE id = ?`,
      [name, codechef_id, codeforce_id, stopstalk_id,status, id]
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
  getNameById(id){

  }
}

module.exports = user_table;