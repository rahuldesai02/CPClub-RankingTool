class user_contest_performance {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    console.log("create database");  
    const sql = `
    CREATE TABLE IF NOT EXISTS user_contest_performance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,platform INTEGER,contest_code TEXT,solved INTEGER,upsolved INTEGER, 
      total INTEGER,
      FOREIGN KEY (user_id) REFERENCES user_table(id))`
      console.log("created table");
    return this.dao.run(sql)
  }
  create(user_id, platform,contest_code, solved,upsolved,total) {
      console.log("Inserting");
      return this.dao.run(
        `INSERT INTO user_contest_performance (user_id, platform,contest_code, solved,upsolved,total)
          VALUES (?, ?, ?, ?, ?, ?)`,
        [user_id, platform,contest_code, solved,upsolved,total])
    }
  update(stat) {
    const { id, user_id, platform,contest_code, solved,upsolved,total} = stat
    return this.dao.run(
      `UPDATE user_contest_performance
      SET user_id = ?,
        platform = ?,
        contest_code = ?,
        solved = ?,
        upsolved = ?,
        total = ?,
      WHERE id = ?`,
      [user_id, platform,contest_code, solved,upsolved,total]
    )
  }
  delete(id) {
    return this.dao.run(
      `DELETE FROM user_contest_performance WHERE id = ?`,
      [id]
    )
  }
  getById(id) {
    return this.dao.get(
      `SELECT * FROM user_contest_performance WHERE id = ?`,
      [id])
  }
  getAll() {
    return this.dao.all(`SELECT * FROM user_contest_performance`)
  }
}

module.exports = user_contest_performance;
