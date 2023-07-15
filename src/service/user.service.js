const connection = require("../app/database");

class UserService {
  async create(user) {
    const { name, password } = user;
    let result;
    try {
      const sql = `INSERT INTO users (username,password) VALUES (?,?);`;
      result = await connection.execute(sql, [name, password]);
    } catch (error) {
      console.log(error);
    }
    return result;
  }

  async getUserByName(name) {
    let result;
    try {
      const sql = `SELECT * FROM users WHERE username = ?`;
      result = await connection.execute(sql, [name]);
    } catch (error) {
      console.log(error);
    }

    return result[0];
  }
}

module.exports = new UserService();
