// models/User.js

const db = require("../config/database");

class User {
  static async register({ name, email, password }) {
    try {
      const result = await db
        .promise()
        .query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
          name,
          email,
          password,
        ]);
      return result[0].insertId;
    } catch (error) {
      console.error("Error registering user:", error);
      throw new Error("Failed to register user");
    }
  }

  static async login({ email, password }) {
    try {
      const [rows] = await db
        .promise()
        .query("SELECT * FROM users WHERE email = ? AND password = ?", [
          email,
          password,
        ]);
      if (rows.length === 0) {
        throw new Error("Invalid email or password");
      }
      return rows[0];
    } catch (error) {
      console.error("Error logging in:", error);
      throw new Error("Failed to login");
    }
  }
}

module.exports = User;
