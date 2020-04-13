class user_stats {
    constructor(dao) {
      this.dao = dao
    }
  
    createTable() {
      console.log("create database");  
      const sql = `
      CREATE TABLE IF NOT EXISTS stats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,user_id TEXT,codechef_rank INTEGER,codeforce_rank INTEGER)`
      return this.dao.run(sql)
    }
    create(date, user_id, codechef_rank, codeforce_rank) {
        console.log("Inserting");
        return this.dao.run(
          `INSERT INTO stats (date, user_id, codechef_rank, codeforce_rank)
            VALUES (?, ?, ?, ?)`,
          [date, user_id, codechef_rank, codeforce_rank])
      }
      update(stat) {
        const { id, date, user_id, codechef_rank, codeforce_rank} = stat
        return this.dao.run(
          `UPDATE stats
          SET date = ?,
            user_id = ?,
            codechef_rank = ?,
            codeforece_rank = ?
          WHERE id = ?`,
          [date, user_id, codechef_rank, codeforce_rank, id]
        )
      }
      delete(id) {
        return this.dao.run(
          `DELETE FROM stats WHERE id = ?`,
          [id]
        )
      }
      getById(id) {
        return this.dao.get(
          `SELECT * FROM stats WHERE id = ?`,
          [id])
      }
      getAll() {
        return this.dao.all(`SELECT * FROM stats`)
      }
  }
  
  module.exports = user_stats;