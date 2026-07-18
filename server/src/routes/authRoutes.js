const express = require("express");

const router = express.Router();

const {

    login,

    signup,

    sendOtpController,

    verifyOtp

} = require("../controllers/authController");

router.post("/login", login);

router.post("/signup", signup);

router.post("/send-otp", sendOtpController);

router.post("/verify-otp", verifyOtp);

module.exports = router;