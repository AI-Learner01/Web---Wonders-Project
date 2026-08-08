const nodemailer = require("nodemailer");

/**
 * This module sets up a mail transporter using Nodemailer with Brevo SMTP service. 
 * It uses environment variables for authentication credentials 
 * @module mail
 * @requires nodemailer
 * @returns {Object} transporter - Nodemailer transporter object for sending emails via Brevo
 */



const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

module.exports = transporter;

