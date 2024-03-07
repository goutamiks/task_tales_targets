const User = require("../model/User");
const Calendar = require("../model/Calendar");
const Tales = require("../model/Tales");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login({ email, password });
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(401).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userId = await User.register({ name, email, password });
    res.status(201).json({ message: "Registration successful", userId });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: error.message });
  }
};

const eventCalendar = async (req, res) => {
  try {
    const { userId, title, start, end, status } = req.body;
    const eventId = await Calendar.calendarEvent({
      userId,
      title,
      start,
      end,
      status,
    });
    res.status(201).json({ message: "Event saved successful", eventId });
  } catch (error) {
    console.error("Error event in calendar:", error);
    res.status(500).json({ error: error.message });
  }
};

const getCalendarEvents = async (req, res) => {
  try {
    const { userId } = req.body;
    // Call the searchEvent method without any parameters to fetch all events
    const events = await Calendar.searchEvent({ userId });

    // Send the fetched events as a response
    res.json(events);
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    res.status(500).json({ error: error.message });
  }
};

const deleteCalendarEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const deletedRows = await Calendar.deleteEvent({ eventId });

    if (deletedRows === 1) {
      res.status(200).json({ message: "Event deleted successfully" });
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: error.message });
  }
};

const markEventCompleted = async (req, res) => {
  try {
    const { eventId } = req.params;
    const updatedRows = await Calendar.markEventCompleted({ eventId });

    if (updatedRows === 1) {
      res
        .status(200)
        .json({ message: "Event marked as completed successfully" });
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (error) {
    console.error("Error marking event as completed:", error);
    res.status(500).json({ error: error.message });
  }
};

const getStatusCounts = async (req, res) => {
  try {
    const { userId } = req.query;
    const statusCounts = await Calendar.getStatusCounts({ userId });
    res.json(statusCounts);
  } catch (error) {
    console.error("Error fetching status counts:", error);
    res.status(500).json({ error: "Failed to fetch status counts" });
  }
};

const fetchDailyCounts = async (req, res) => {
  try {
    const { userId } = req.query;
    const statusCounts = await Calendar.fetchDailyCounts({ userId });
    res.json(statusCounts);
  } catch (error) {
    console.error("Error fetching status counts:", error);
    res.status(500).json({ error: "Failed to fetch status counts" });
  }
};

const tales = async (req, res) => {
  try {
    const { inputValue, userId } = req.body;
    const dairyContent = await Tales.create({ inputValue, userId });
    res.status(200).json({ message: "Created Successful", dairyContent });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(401).json({ error: error.message });
  }
};

const getTales = async (req, res) => {
  try {
    const { userId } = req.query;
    // Call the searchEvent method without any parameters to fetch all events
    const events = await Tales.getTales({ userId });

    // Send the fetched events as a response
    res.json(events);
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  registerUser,
  eventCalendar,
  getCalendarEvents,
  deleteCalendarEvent,
  markEventCompleted,
  getStatusCounts,
  fetchDailyCounts,
  tales,
  getTales,
};
