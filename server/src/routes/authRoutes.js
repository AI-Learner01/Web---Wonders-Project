const express = require("express");

const router = express.Router();

const {

    login,

    signup,

    sendOtpController,

    verifyOtp,

    resetPassword

} = require("../controllers/authController");

router.post("/login", login);//if server want to send req on /auth/login than come here

router.post("/signup", signup);

router.post("/send-otp", sendOtpController);

router.post("/verify-otp", verifyOtp);

router.post("/reset-password", resetPassword);

module.exports = router;