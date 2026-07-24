const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { collectionUserData, collectionOtps, collectionQuries } = require("../config/db");
const { sendOtp } = require("../services/otpService");
const transporter = require("../config/mail");

/**
 * 1. Send OTP Controller
 */
const sendOtpController = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const normalizedEmail = email.trim().toLowerCase();
        await sendOtp(normalizedEmail);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        });
    } catch (err) {
        console.error("Send OTP Error:", err);
        return res.status(500).json({ success: false, message: "Error sending OTP" });
    }
};

/**
 * 2. Verify OTP Controller
 */
const verifyOtp = async (req, res) => {
    try {
        const { email, otp1 } = req.body;

        if (!email || !otp1) {
            return res.status(400).json({ success: false, message: "Email and OTP are required" });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const latestOtp = await collectionOtps
            .find({ email: normalizedEmail })
            .sort({ createdAt: -1 })
            .limit(1)
            .toArray();

        if (latestOtp.length === 0) {
            return res.status(400).json({ success: false, message: "OTP record not found" });
        }

        const otpData = latestOtp[0];
        const fiveMinutes = 5 * 60 * 1000;

        if (Date.now() - new Date(otpData.createdAt).getTime() > fiveMinutes) {
            await collectionOtps.deleteOne({ _id: otpData._id });
            return res.status(400).json({ success: false, message: "OTP has expired" });
        }

        if (otpData.otp.toString() !== otp1.toString().trim()) {
            return res.status(400).json({ success: false, message: "Invalid OTP code" });
        }

        // Clean up verified OTP
        await collectionOtps.deleteOne({ _id: otpData._id });

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        });

    } catch (err) {
        console.error("Verify OTP Error:", err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * 3. Reset Password Controller
 */
const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({ success: false, message: "All fields are mandatory" });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const latestOtpRecord = await collectionOtps
            .find({ email: normalizedEmail })
            .sort({ createdAt: -1 })
            .limit(1)
            .toArray();

        if (latestOtpRecord.length === 0) {
            return res.status(400).json({ success: false, message: "Verification OTP not found" });
        }

        const otpData = latestOtpRecord[0];
        const fiveMinutes = 5 * 60 * 1000;

        if (Date.now() - new Date(otpData.createdAt).getTime() > fiveMinutes) {
            await collectionOtps.deleteOne({ _id: otpData._id });
            return res.status(400).json({ success: false, message: "Verification token expired" });
        }

        if (otpData.otp.toString() !== otp.toString().trim()) {
            return res.status(400).json({ success: false, message: "Invalid validation OTP code" });
        }

        const hashedSecurePassword = await bcrypt.hash(newPassword, 10);

        const updatedResult = await collectionUserData.updateOne(
            { email: normalizedEmail },
            { $set: { password: hashedSecurePassword } }
        );

        if (updatedResult.matchedCount === 0) {
            return res.status(404).json({ success: false, message: "User account not found" });
        }

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
    try {
        const { fullName, email, phone, password } = req.body;

        if (!fullName || !email || !phone || !password) {
            return res.status(400).json({ success: false, message: "All parameters are required" });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const normalizedPhone = phone.trim();

        const existingUserEmail = await collectionUserData.findOne({ email: normalizedEmail });
        const existingUserPhone = await collectionUserData.findOne({ phone: normalizedPhone });

        if (existingUserEmail || existingUserPhone) {
            return res.status(409).json({ 
                success: false, 
                message: "An account already exists with this email or phone number" 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await collectionUserData.insertOne({
            name: fullName.trim(),
            email: normalizedEmail,
            phone: normalizedPhone,
            password: hashedPassword,
            createdAt: new Date()
        });

        return res.status(200).json({ success: true, message: "Account created successfully" });

    } catch (err) {
        console.error("Signup Error:", err);
        return res.status(500).json({ success: false, message: "Failed to create account" });
    }
};

/**
 * 5. Login Controller
 */
const login = async (req, res) => {
    try {
        const { emailOrPhone, password } = req.body;

        if (!emailOrPhone || !password) {
            return res.status(400).json({ success: false, message: "Credentials are required" });
        }

        const inputIdentifier = emailOrPhone.trim().toLowerCase();

        const user = await collectionUserData.findOne({ 
            $or: [{ email: inputIdentifier }, { phone: emailOrPhone.trim() }] 
        });

        if (!user) {
            return res.status(401).json({ success: false, message: "Account not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        // Role Resolution (Matches: admin@aura.com or admin123@aura.com)
        const isAdmin = /^admin(\d+)?@aura\.com$/.test(user.email);

        const token = jwt.sign(
            {
                email: user.email,
                role: isAdmin ? "admin" : "user"
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure in production
            sameSite: "lax",
            maxAge: 3600000
        });

        return res.status(200).json({ 
            success: true, 
            message: "Login successful",
            role: isAdmin ? "admin" : "user"
        });

    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * 6. Contact Us / Support Query Controller
 */
const contactUs = async (req, res) => {
    try {
        const { topic, emailOrPhone, message } = req.body;

        if (!topic || !emailOrPhone || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const cleanContact = emailOrPhone.trim();

        const newQuery = {
            topic,
            contact: cleanContact,      
            emailOrPhone: cleanContact, 
            message: message.trim(),
            status: "pending",          
            createdAt: new Date()
        };

        const result = await collectionQuries.insertOne(newQuery);
        const receiptNo = result.insertedId.toString();

        if (cleanContact.includes("@")) {
            try {
                await transporter.sendMail({
                    from: `"AuraAvenue Support" <${process.env.EMAIL_USER}>`,
                    to: cleanContact,
                    subject: `Query Received - Receipt #${receiptNo.slice(-6).toUpperCase()}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff; color: #1e293b;">
                            <div style="background-color: #14c38e; padding: 20px; text-align: center; color: #ffffff;">
                                <h2 style="margin: 0; font-size: 22px; font-weight: bold;">Query Receipt</h2>
                                <p style="margin: 5px 0 0; font-size: 13px; opacity: 0.9;">AuraAvenue Customer Support</p>
                            </div>

                            <div style="padding: 24px;">
                                <p style="margin-top: 0; font-size: 15px; color: #475569;">Dear Valued Customer,</p>
                                <p style="font-size: 14px; color: #475569; line-height: 1.5;">
                                    Thank you for contacting us. Your query has been successfully registered in our system. Here are your submission details:
                                </p>

                                <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 16px; margin: 20px 0;">
                                    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                                        <tr>
                                            <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Receipt No / Reference ID:</td>
                                            <td style="padding: 6px 0; text-align: right; font-weight: bold; color: #0f172a; font-family: monospace; font-size: 13px;">${receiptNo}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Topic:</td>
                                            <td style="padding: 6px 0; text-align: right; font-weight: 600; color: #0f172a; text-transform: capitalize;">${topic}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Status:</td>
                                            <td style="padding: 6px 0; text-align: right; font-weight: bold; color: #d97706;">Pending Review</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Date:</td>
                                            <td style="padding: 6px 0; text-align: right; color: #0f172a;">${new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                        </tr>
                                    </table>

                                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 12px 0;" />

                                    <div>
                                        <span style="font-size: 13px; color: #64748b; font-weight: 600; display: block; margin-bottom: 4px;">Your Message:</span>
                                        <p style="margin: 0; font-size: 13px; color: #334155; font-style: italic; background-color: #ffffff; padding: 10px; border-radius: 6px; border: 1px solid #f1f5f9;">
                                            "${message}"
                                        </p>
                                    </div>
                                </div>

                                <p style="font-size: 13px; color: #64748b; line-height: 1.5; margin-bottom: 20px;">
                                    Our support team is actively reviewing your request and will get back to you shortly.
                                </p>

                                <p style="margin: 0; font-size: 14px; font-weight: bold; color: #1e293b;">Best regards,</p>
                                <p style="margin: 2px 0 0; font-size: 14px; font-weight: bold; color: #14c38e;">AuraAvenue Support Team</p>
                            </div>

                            <div style="background-color: #f1f5f9; padding: 12px; text-align: center; font-size: 11px; color: #94a3b8;">
                                This is an automated notification. Please do not reply directly to this email.
                            </div>
                        </div>
                    `
                });
            } catch (mailErr) {
                console.error("Confirmation Mail Error:", mailErr.message);
            }
        }

        return res.status(200).json({
            success: true,
            receiptNo: receiptNo,
            message: "Query submitted successfully"
        });

    } catch (err) {
        console.error("Contact US Error:", err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

/**
 * 7. Token Verification Middleware/Handler
 */
const verifyToken = (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ success: false, message: "Token not found" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Invalid or expired token" });
        }

        return res.status(200).json({
            success: true,
            message: "Token is valid",
            email: decoded.email,
            role: decoded.role
        });
    });
};

/**
 * 8. Logout Controller
 */
const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    });
    return res.status(200).json({ success: true, message: "Logout successful" });
};

module.exports = {
    login,
    signup,
    sendOtpController,
    verifyOtp,
    resetPassword,
    contactUs,
    verifyToken,
    logout
};