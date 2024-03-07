// config/database.js

const mysql = require("mysql2");

// Create a connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "26G11nov#", // Replace with your MySQL password
  database: "myProdDB", // Replace with your MySQL database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = connection;
