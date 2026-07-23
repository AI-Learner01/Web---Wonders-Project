const express = require("express");

/**
 * 
 * this module defines the authentication routes for the application, including login, signup, OTP sending and verification, password reset, contact form submission, token verification, and logout. It imports the necessary controller functions from authController.js and sets up the corresponding routes using Express Router.
 * @module authRoutes
 * @requires express
 * @requires ../controllers/authController
 * @returns {Object} router - Express Router object with defined authentication routes
 */


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