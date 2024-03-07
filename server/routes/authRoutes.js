const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.post("/login", authController.loginUser);
router.post("/register", authController.registerUser);
router.post("/calendarEvent", authController.eventCalendar);
router.post("/getCalendarEvents", authController.getCalendarEvents);
router.delete("/deleteCalendarEvent", authController.deleteCalendarEvent);
router.put("/markEventCompleted/:eventId", authController.markEventCompleted);
router.get("/getStatusCounts", authController.getStatusCounts);
router.get("/fetchDailyCounts", authController.fetchDailyCounts);
router.post("/tales", authController.tales);
router.get("/getTales", authController.getTales);

module.exports = router;
