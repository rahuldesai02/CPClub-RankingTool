class user_stats {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    console.log("create database");  
    const sql = `
    CREATE TABLE IF NOT EXISTS stats (
      date TEXT,user_id INTEGER,codechef_rank INTEGER,codeforce_rank INTEGER, 
      PRIMARY KEY (date,user_id),
      FOREIGN KEY (user_id) REFERENCES user_table(id))`
    return this.dao.run(sql)
  }
  create(date, user_id, codechef_rank, codeforce_rank) {
      console.log("Inserting");
      return this.dao.run(
        `INSERT or IGNORE INTO stats (date, user_id, codechef_rank, codeforce_rank)
          VALUES (?, ?, ?, ?)`,
        [date, user_id, codechef_rank, codeforce_rank])
    }
  update(stat) {
    const { date, user_id, codechef_rank, codeforce_rank} = stat
    return this.dao.run(
      `UPDATE stats
      SET date = ?,
        user_id = ?,
        codechef_rank = ?,
        codeforece_rank = ?
      WHERE date = ? AND user_id = ?`,
      [date, user_id, codechef_rank, codeforce_rank, date, user_id]
    )
  }
  delete(date, user_id) {
    return this.dao.run(
      `DELETE FROM stats WHERE date = ? AND user_id = ?`,
      [date,user_id]
    )
  }
  getByDateId(date,user_id) {
    return this.dao.get(
      `SELECT * FROM stats WHERE date = ? AND user_id = ?`,
      [date,user_id])
  }
  getAll() {
    return this.dao.all(`SELECT * FROM stats`)
  }
  getRankByDateId(date,user_id){
    return this.dao.get(
      `SELECT codechef_rank, codeforce_rank FROM stats WHERE date = ? AND user_id = ?`,
      [date,user_id])
  }
}
module.exports = user_stats;