const express = require("express");

const router = express.Router();

const {

    login,

    signup,

    sendOtpController,

    verifyOtp,

    resetPassword,

    contactUs,

    verifyToken,

    logout

} = require("../controllers/authController");
const { verify } = require("../config/mail");

router.post("/login", login);//if server want to send req on /auth/login than come here

router.post("/logout", logout);

router.post("/signup", signup);

router.post("/send-otp", sendOtpController);

router.post("/verify-otp", verifyOtp);

router.post("/reset-password", resetPassword);

router.post("/contact-us",contactUs);

router.post("/verify-token", verifyToken);

module.exports = router;