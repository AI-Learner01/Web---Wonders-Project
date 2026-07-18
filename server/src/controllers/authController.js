const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {
    collectionUserData,
    collectionOtps
} = require("../config/db");


const { sendOtp } = require("../services/otpService");
const sendOtpController = async (req, res) => {

    const { email } = req.body;

    await sendOtp(email);

    res.status(200).json({
        success: true,
        message: "OTP Sent Successfully"
    });

};


const verifyOtp = async (req, res) => {
    try {
        const { email, otp1 ,otp2} = req.body;

        const latestOtp = await collectionOtps
            .find({ email })
            .sort({ createdAt: -1 })
            .limit(1)
            .toArray();

        if (latestOtp.length === 0) {
            return res.status(400).json({
                success: false,
                message: "OTP not found"
            });
        }

        const otpData = latestOtp[0];

        // Check expiry (5 minutes)
        const fiveMinutes = 5 * 60 * 1000;

        if (Date.now() - otpData.createdAt.getTime() > fiveMinutes) {
            await collectionOtps.deleteOne({ _id: otpData._id });

            return res.status(400).json({
                success: false,
                message: "OTP Expired"
            });
        }

        console.log("Entered OTP:", otp1);
console.log("Stored OTP :", otpData.otp);

        // Verify only otp1
        if (otpData.otp.toString() !== otp1) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        // OTP is correct
        await collectionOtps.deleteOne({ _id: otpData._id });

        res.json({
            success: true,
            message: "OTP Verified"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}

const signup = async (req, res) => {
        const { fullName, email, phone, password } = req.body;

    //check email exits ?
    const existingUserEmail = await collectionUserData.findOne({ "email": email });
    const existingUserPhone = await collectionUserData.findOne({ "phone": phone });

    if (!existingUserEmail && !existingUserPhone) {

        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10
        await collectionUserData.insertOne({
            "name": fullName,
            "email": email,
            "phone": phone,
            "password": hashedPassword
        });

        return res.status(200).json({ "success": true, "message": "Account Created SuccessFull" });
    }
    else {
        return res.status(409).json({ "success": false, "message": "You have already an account" });
    }
}

const login = async (req, res) => {

    const { emailOrPhone, password } = req.body;



    const user = await collectionUserData.findOne({ $or: [{ "email": emailOrPhone }, { "phone": emailOrPhone }] });

    if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            const token = jwt.sign(
                { "email": emailOrPhone },
                process.env.JWT_SECRET,
                { "expiresIn": "1h" }

            );
            console.log("Generated Token(from server):", token);

            res.cookie("token", token, {
                httpOnly: true,
                secure: false,  //for local http :false , for https :true
                sameSite: "lax",
                maxAge: 3600000 //1 hour miliseconds
            });

            return res.status(200).json({ "success": true, "message": "Login successful" });
        }
        else {
            res.status(401).json({ "success": false, "message": "Invalid passWord" });
        }
    }
    else {
        res.status(401).json({ "success": false, "message": "You did Not have account" });
    }
}



module.exports = {

    login,

    signup,

    sendOtpController,

    verifyOtp

};