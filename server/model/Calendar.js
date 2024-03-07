const db = require("../config/database");

class Calendar {
  static async calendarEvent({ userId, title, start, end, status }) {
    try {
      const result = await db
        .promise()
        .query(
          "INSERT INTO events (userId, title, start, end, status) VALUES (?, ?, ?,?,?)",
          [userId, title, start, end, status]
        );
      return result[0].insertId;
    } catch (error) {
      console.error("Error registering user:", error);
      throw new Error("Failed to register user");
    }
  }

  static async searchEvent({ userId }) {
    try {
      const query = "SELECT * FROM events WHERE userId = ?";
      const [events] = await db.promise().query(query, [userId]);
      return events;
    } catch (error) {
      console.error("Error searching events:", error);
      throw new Error("Failed to search events");
    }
  }

  static async deleteEvent({ eventId }) {
    try {
      const result = await db
        .promise()
        .query("DELETE FROM events WHERE eventId = ?", [eventId]);
      return result[0].affectedRows;
    } catch (error) {
      console.error("Error deleting event:", error);
      throw new Error("Failed to delete event");
    }
  }

  static async markEventCompleted({ eventId }) {
    try {
      const result = await db
        .promise()
        .query("UPDATE events SET status = 'COMPLETED' WHERE eventId = ?", [
          eventId,
        ]);
      return result[0].affectedRows;
    } catch (error) {
      console.error("Error marking event as completed:", error);
      throw new Error("Failed to mark event as completed");
    }
  }

  static async getStatusCounts({ userId }) {
    try {
      const query = `
        SELECT
          SUM(CASE WHEN status = 'UPCOMING' THEN 1 ELSE 0 END) as UPCOMING,
          SUM(CASE WHEN status = 'ONGOING' THEN 1 ELSE 0 END) as ONGOING,
          SUM(CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END) as COMPLETED
        FROM events
        WHERE userId = ?
      `;
      const [statusCounts] = await db.promise().query(query, [userId]);
      return statusCounts[0];
    } catch (error) {
      console.error("Error fetching status counts:", error);
      throw new Error("Failed to fetch status counts");
    }
  }

  static async fetchDailyCounts({ userId }) {
    try {
      const query = `
        SELECT
          DATE(start) as date,
          COUNT(*) as count
        FROM events
        WHERE userId = ?
        GROUP BY DATE(start)
        ORDER BY DATE(start) ASC
      `;
      const [dailyCounts] = await db.promise().query(query, [userId]);
      return dailyCounts;
    } catch (error) {
      console.error("Error fetching daily counts:", error);
      throw new Error("Failed to fetch daily counts");
    }
  }
}

module.exports = Calendar;
