const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cron = require("node-cron");
const db = require("./config/database");

// Import routes
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(bodyParser.json());

// Configure CORS to allow requests from localhost:3000
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Define routes
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Define cron job to run every minute
cron.schedule("* * * * *", async () => {
  try {
    console.log("Cron job running...");
    // Query to fetch events from the database
    const events = await db.promise().query("SELECT * FROM events");

    // Loop through each event
    for (const event of events[0]) {
      if (event.status !== "COMPLETED") {
        const currentTime = new Date();
        if (currentTime >= event.start && currentTime <= event.end) {
          event.status = "ONGOING";
        }

        // Update the event status in the database
        await db
          .promise()
          .query("UPDATE events SET status = ? WHERE eventId = ?", [
            event.status,
            event.eventId,
          ]);
      }
    }
    console.log(
      `Cron job executed successfully at ${new Date().toLocaleString()}`
    );
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});
