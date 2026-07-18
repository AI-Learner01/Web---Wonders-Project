const transporter = require("../config/mail");

const { collectionOtps } = require("../config/db");

async function generateOtp(email) {

    // Purane OTP delete
    await collectionOtps.deleteMany({ email });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await collectionOtps.insertOne({
        email,
        otp,
        createdAt: new Date()
    });

    return otp;
}

async function sendOtp(email) {

    const otp = await generateOtp(email);

    await transporter.sendMail({
        from: process.env.MY_EMAIL,
        to: email,
        subject: "Travel and Tourism OTP Verification",
        text: `Your OTP code is: ${otp}`
    });

    console.log(`OTP sent to ${email}`);
}

module.exports = {
    sendOtp
};