const express = require("express");
const router = express.Router();

const {
  getAllNotifications,
  markAsRead,
  getAllUnreadNotifications
} = require("../controllers/notificationController");

/**
 * @route   POST /notifications/get-all
 * @desc    Fetch all notifications
 */
router.post("/get-all", getAllNotifications);

/**
 * @route   POST /notifications/mark-read
 * @desc    Mark a specific notification as read
 */
router.post("/mark-read", markAsRead);

router.post("/unread", getAllUnreadNotifications);

module.exports = router;