const { ObjectId } = require("mongodb");
const transporter = require("../config/mail");
const { collectionQuries, collectionOtps } = require("../config/db");

// 1. Fetch Pending Queries
const pendingQueries = async (req, res) => {
    try {
        const queries = await collectionQuries.find({ status: "pending" }).sort({ createdAt: -1 }).toArray();
        res.status(200).json({ success: true, queries });
    } catch (err) {
        console.error("Pending Queries Error:", err);
        res.status(500).json({ success: false, message: "Error fetching queries" });
    }
};

// 2. Fetch Resolved Queries
const resolvedQueries = async (req, res) => {
    try {
        const queries = await collectionQuries.find({ status: "resolved" }).sort({ resolvedAt: -1 }).toArray();
        res.status(200).json({ success: true, queries });
    } catch (err) {
        console.error("Resolved Queries Error:", err);
        res.status(500).json({ success: false, message: "Error fetching resolved queries" });
    }
};

// 3. Update Query Status & Send Email Notification
const updateQueryStatus = async (req, res) => {
    try {
        const { id, message, resolvedBy } = req.body;

        if (!id || !message) {
            return res.status(400).json({
                success: false,
                message: "Query ID and message are required"
            });
        }

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Query ID"
            });
        }

        // Check Query
        const query = await collectionQuries.findOne({ _id: new ObjectId(id) });

        if (!query) {
            return res.status(404).json({
                success: false,
                message: "Query not found"
            });
        }

        // Update DB
        await collectionQuries.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    status: "resolved",
                    resolvedBy: resolvedBy || "Admin",
                    replyMessage: message,
                    resolvedAt: new Date()
                }
            }
        );

        // Send Email Safely
        try {
            console.log(`Sending query resolution email to: ${query.contact}...`);

            const mailOptions = {
                from: `"AuraAvenue Support" <${process.env.EMAIL_USER}>`,
                to: query.contact,
                subject: `Query Resolved - [${query.topic}]`,
                html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 550px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff; color: #1e293b;">
                
                <!-- Header -->
                <div style="background-color: #10b981; padding: 24px; text-align: center; color: #ffffff;">
                    <h2 style="margin: 0; font-size: 20px; font-weight: 600;">Query Resolved</h2>
                    <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.9;">AuraAvenue Support Team</p>
                </div>

                <!-- Content Body -->
                <div style="padding: 24px;">
                    <p style="margin-top: 0; font-size: 15px; color: #334155;">Hello,</p>
                    <p style="font-size: 14px; color: #475569; line-height: 1.6;">
                        Great news! Your query regarding <b style="color: #0f172a;">${query.topic}</b> has been reviewed and resolved by our support team.
                    </p>

                    <!-- Details Card -->
                    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0;">
                        
                        <!-- Customer's Original Message -->
                        <div style="margin-bottom: 16px;">
                            <span style="font-size: 12px; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">
                                Your Message / Query:
                            </span>
                            <div style="font-size: 13px; color: #475569; background-color: #f1f5f9; padding: 10px 12px; border-radius: 6px; border-left: 4px solid #94a3b8; font-style: italic; line-height: 1.4;">
                                "${query.message || 'No message content provided.'}"
                            </div>
                        </div>

                        <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 16px 0;" />
                        
                        <!-- Admin Reply -->
                        <div>
                            <span style="font-size: 12px; color: #10b981; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">
                                Admin Reply / Resolution:
                            </span>
                            <div style="font-size: 14px; color: #0f172a; background-color: #ffffff; padding: 12px; border-radius: 6px; border: 1px solid #cbd5e1; line-height: 1.5; white-space: pre-line; font-weight: 500;">
                                ${message}
                            </div>
                        </div>

                    </div>

                    <p style="font-size: 13px; color: #64748b; line-height: 1.5;">
                        If you still have any questions or require further assistance, please feel free to reach out to us again.
                    </p>

                    <br />
                    <p style="margin: 0; font-size: 14px; font-weight: 600; color: #1e293b;">Best regards,</p>
                    <p style="margin: 2px 0 0; font-size: 14px; font-weight: bold; color: #10b981;">AuraAvenue Support Team</p>
                </div>

                <!-- Footer -->
                <div style="background-color: #f1f5f9; padding: 12px; text-align: center; font-size: 11px; color: #94a3b8;">
                    This is an automated response regarding your support request.
                </div>
            </div>
        `
            };

            const info = await transporter.sendMail(mailOptions);
            console.log("Resolution email sent successfully! Message ID:", info.messageId);

        } catch (mailError) {
            console.error("❌ Resolution Email Error:", mailError.message);
        }

        return res.status(200).json({
            success: true,
            message: "Query resolved successfully"
        });

    } catch (err) {
        console.error("Server Error:", err);
        return res.status(500).json({
            success: false,
            message: err.message || "Internal Server Error"
        });
    }
};

// 4. Get Admin OTP Logs
const getAdminOtpLogs = async (req, res) => {
    try {
        // Find OTP logs that match admin email regex pattern
        const otpLogs = await collectionOtps
            .find({ email: { $regex: /^admin(\d+)?@aura\.com$/i } })
            .sort({ createdAt: -1 })
            .toArray();

        return res.status(200).json({
            success: true,
            otpLogs
        });
    } catch (err) {
        console.error("Fetch OTP Logs Error:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch admin OTP logs"
        });
    }
};

module.exports = {
    pendingQueries,
    updateQueryStatus,
    resolvedQueries,
    getAdminOtpLogs
};