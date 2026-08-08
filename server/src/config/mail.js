const nodemailer = require("nodemailer");

/**
 * This module sets up a mail transporter using Nodemailer with Brevo SMTP service. 
 * It uses environment variables for authentication credentials (BREVO_SMTP_EMAIL and BREVO_SMTP_KEY).
 * @module mail
 * @requires nodemailer
 * @returns {Object} transporter - Nodemailer transporter object for sending emails via Brevo
 */

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // false for port 587
    auth: {
        user: process.env.BREVO_SMTP_EMAIL,
        pass: process.env.BREVO_SMTP_KEY
    }
});

module.exports = transporter;