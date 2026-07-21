const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { collectionUserData, collectionOtps ,collectionQuries} = require("../config/db");
const { sendOtp } = require("../services/otpService");

/**
 * 1. Send OTP Controller (Used for both signup and forgot password)
 */
const sendOtpController = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        await sendOtp(email);

        res.status(200).json({
            success: true,
            message: "OTP Sent Successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error sending OTP" });
    }
};

/**
 * 2. Verify OTP Controller (Existing signup verification)
 */
const verifyOtp = async (req, res) => {
    try {
        const { email, otp1, otp2 } = req.body;

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
        const fiveMinutes = 5 * 60 * 1000;

        if (Date.now() - new Date(otpData.createdAt).getTime() > fiveMinutes) {
            await collectionOtps.deleteOne({ _id: otpData._id });
            return res.status(400).json({
                success: false,
                message: "OTP Expired"
            });
        }

        if (otpData.otp.toString() !== otp1) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

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
};

/**
 * 3. Reset Password Function (Only Email based)
 * Path: POST /auth/reset-password
 */
const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({ success: false, message: "All parameters are mandatory" });
        }

        // 1. Database se sirf email ke basis par latest OTP record find karein
        const latestOtpRecord = await collectionOtps
            .find({ email })
            .sort({ createdAt: -1 })
            .limit(1)
            .toArray();

        if (latestOtpRecord.length === 0) {
            return res.status(400).json({ success: false, message: "Verification OTP not found" });
        }

        const otpData = latestOtpRecord[0];
        const fiveMinutes = 5 * 60 * 1000;

        // 2. Expiry check (5 minutes lifecycle window)
        if (Date.now() - new Date(otpData.createdAt).getTime() > fiveMinutes) {
            await collectionOtps.deleteOne({ _id: otpData._id });
            return res.status(400).json({ success: false, message: "Verification token expired" });
        }

        // 3. Strict verification check for OTP match
        if (otpData.otp.toString() !== otp.trim()) {
            return res.status(400).json({ success: false, message: "Invalid validation OTP code" });
        }

        // 4. Securely hash the new password using bcrypt
        const hashedSecurePassword = await bcrypt.hash(newPassword, 10);

        // 5. User data update query matching only target email field
        const updatedResult = await collectionUserData.updateOne(
            { "email": email },
            { $set: { password: hashedSecurePassword } }
        );

        if (updatedResult.matchedCount === 0) {
            return res.status(444).json({ success: false, message: "User account not found." });
        }

        // 6. Purge used OTP code context from collectionOtps database
        await collectionOtps.deleteOne({ _id: otpData._id });

        return res.status(200).json({
            success: true,
            message: "Password updated successfully!"
        });

    } catch (err) {
        console.error("Reset Password Error:", err);
        return res.status(500).json({ success: false, message: "Database failure occurred while updating password" });
    }
};

/**
 * 4. Signup Controller
 */
const signup = async (req, res) => {
    const { fullName, email, phone, password } = req.body;

    const existingUserEmail = await collectionUserData.findOne({ "email": email });
    const existingUserPhone = await collectionUserData.findOne({ "phone": phone });

    if (!existingUserEmail && !existingUserPhone) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await collectionUserData.insertOne({
            "name": fullName,
            "email": email,
            "phone": phone,
            "password": hashedPassword
        });

        return res.status(200).json({ "success": true, "message": "Account Created SuccessFull" });
    } else {
        return res.status(409).json({ "success": false, "message": "You have already an account" });
    }
};

/**
 * 5. Login Controller
 */
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
                secure: false, // local server context
                sameSite: "lax",
                maxAge: 3600000
            });

            return res.status(200).json({ "success": true, "message": "Login successful" });
        } else {
            res.status(401).json({ "success": false, "message": "Invalid passWord" });
        }
    } else {
        res.status(401).json({ "success": false, "message": "You did Not have account" });
    }
};

const contactUs = async (req,res) =>{
    const { topic, emailOrPhone, message } = req.body;

    // Process the contact message (e.g., save to database, send email, etc.)

    await collectionQuries.insertOne({
        "topic": topic,
        "contact": emailOrPhone,
        "message": message
    });

    // This is a placeholder - replace with actual implementation

    return res.status(200).json({ "success": true, "message": "Message sent successfully!" });
};

const verifyToken = (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token not found"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Token is valid",
            email: decoded.email
        });
    });
};

const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false, // local server context
        sameSite: "lax"
    });
    return res.status(200).json({ success: true, message: "Logout successful" });
};

module.exports = {
    login,
    signup,
    sendOtpController,
    verifyOtp,
    resetPassword, // Exporting clean function context
    contactUs,
    verifyToken,
    logout
};