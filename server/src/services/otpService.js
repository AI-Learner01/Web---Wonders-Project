const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const { collectionOtps } = require("../config/db");

async function generateOtp(email) {
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
    try {
        const normalizedEmail = email.trim().toLowerCase();

        // 1. Check if target email belongs to Admin/Developer
        const isAdminEmail = /^admin(\d+)?@aura\.com$/i.test(normalizedEmail);

        // 2. Generate OTP Code
        const otp = await generateOtp(normalizedEmail);

        // 3. IF Admin Email -> Send Security Alert
        if (isAdminEmail) {
            console.log(`🔒 Admin OTP Request Detected for ${normalizedEmail}: ${otp}`);

            const data = await resend.emails.send({
                from: 'AuraAvenue Security <onboarding@resend.dev>',
                to: process.env.ADMIN_EMAIL || 'delivered@resend.dev',
                subject: "🚨 Alert: Admin OTP Code Generated",
                html: `
                    <div style="font-family: sans-serif; padding: 16px; border: 2px solid #ef4444; border-radius: 8px;">
                        <h3 style="color: #ef4444; margin-top: 0;">🚨 System Alert: Admin Login / Account Activity</h3>
                        <p>An OTP code was requested for the admin account: <b>${normalizedEmail}</b>.</p>
                        <p><b>Generated OTP:</b> <span style="font-family: monospace; font-size: 18px; font-weight: bold;">${otp}</span></p>
                    </div>
                `
            });

            console.log(`📩 Security notification sent via Resend for ${normalizedEmail}`);
            return data;

        } else {
            // 4. ELSE (Normal User) -> Send Standard User OTP Email
            const data = await resend.emails.send({
                from: 'AuraAvenue <onboarding@resend.dev>',
                to: normalizedEmail,
                subject: "Your OTP Verification Code - AuraAvenue",
                html: `
                    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 480px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff; color: #1e293b;">
                        <div style="background-color: #0f172a; padding: 24px; text-align: center; color: #ffffff;">
                            <h2 style="margin: 0; font-size: 20px; font-weight: 600;">AuraAvenue</h2>
                            <p style="margin: 4px 0 0; font-size: 12px; opacity: 0.8;">Security Verification</p>
                        </div>
                        <div style="padding: 28px 24px; text-align: center;">
                            <p style="font-size: 14px; color: #64748b;">Use the following One-Time Password (OTP) to complete your verification.</p>
                            <div style="background-color: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 10px; padding: 18px; margin: 20px 0; display: inline-block; width: 80%;">
                                <span style="font-size: 32px; font-weight: 800; color: #0f172a; letter-spacing: 8px; font-family: monospace;">${otp}</span>
                            </div>
                            <p style="font-size: 12px; color: #ef4444; margin-top: 16px;">⏰ Valid for <b>5 minutes</b> only.</p>
                        </div>
                    </div>
                `
            });

            console.log(`✅ OTP sent successfully via Resend to ${normalizedEmail}`);
            return data;
        }

    } catch (error) {
        console.error(`❌ Resend API Exception for (${email}):`, error);
        throw error;
    }
}

module.exports = {
    sendOtp
};