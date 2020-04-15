class contests{
    constructor(dao) {
      this.dao = dao
    }
  
    createTable() {
      console.log("create database");  
      const sql = `
      CREATE TABLE IF NOT EXISTS contest (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,platform TEXT,link TEXT)`
      return this.dao.run(sql)
    }
    create(date, platform, link) {
        console.log("Inserting");
        return this.dao.run(
          `INSERT INTO contest (date, platform, link)
            VALUES (?, ?, ?)`,
          [date, platform, link])
      }
      update(stat) {
        const { id, date, platform, link} = stat
        return this.dao.run(
          `UPDATE contest
          SET date = ?,
            platform = ?,
            link = ?,
          WHERE id = ?`,
          [date, platform, link, id]
        )
      }
      delete(id) {
        return this.dao.run(
          `DELETE FROM contest WHERE id = ?`,
          [id]
        )
      }
      getById(id) {
        return this.dao.get(
          `SELECT * FROM contest WHERE id = ?`,
          [id])
      }
      getAll() {
        return this.dao.all(`SELECT * FROM contest`)
      }
  }
  
  module.exports = contests;