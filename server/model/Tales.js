// models/User.js

const db = require("../config/database");

class Tales {
  static async create({ inputValue, userId }) {
    try {
      const result = await db
        .promise()
        .query("INSERT INTO diaryentries (inputValue, userId) VALUES (?, ?)", [
          inputValue,
          userId,
        ]);
      return result[0].insertId;
    } catch (error) {
      console.error("Error in creating tales:", error);
      throw new Error("Failed to creating tales");
    }
  }

  static async getTales({ userId }) {
    try {
      const query = "SELECT * FROM diaryentries WHERE userId = ?";
      const [events] = await db.promise().query(query, [userId]);
      return events;
    } catch (error) {
      console.error("Error searching events:", error);
      throw new Error("Failed to search events");
    }
  }
}

module.exports = Tales;
