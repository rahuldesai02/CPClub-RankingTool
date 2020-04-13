class userContestPerformances {
    constructor(dao) {
      this.dao = dao
    }
  
    createTable() {
      console.log("create database");  
      const sql = `
      CREATE TABLE IF NOT EXISTS userContestPerformance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT,contest_id INTEGER,solved INTEGER,upsolved INTEGER, FOREIGN KEY (contest_id)
        REFERENCES contest (id) )`
      return this.dao.run(sql)
    }
    create(date, user_id, contest_id, solved,upsolved) {
        console.log("Inserting");
        return this.dao.run(
          `INSERT INTO userContestPerformance (user_id, contest_id, solved,upsolved)
            VALUES (?, ?, ?, ?)`,
          [user_id, contest_id, solved, upsolved])
      }
      update(stat) {
        const { id, user_id, contest_id, solved,upsolved} = stat
        return this.dao.run(
          `UPDATE userContestPerformance
          SET user_id = ?,
            contest_id = ?,
            solved = ?,
            upsolved = ?,
          WHERE id = ?`,
          [user_id, contest_id, solved,upsolved, id]
        )
      }
      delete(id) {
        return this.dao.run(
          `DELETE FROM userContestPerformance WHERE id = ?`,
          [id]
        )
      }
      getById(id) {
        return this.dao.get(
          `SELECT * FROM userContestPerformance WHERE id = ?`,
          [id])
      }
      getAll() {
        return this.dao.all(`SELECT * FROM userContestPerformance`)
      }
  }
  
  module.exports = userContestPerformances;
