const { ObjectId } = require("mongodb");
const transporter = require("../config/mail");
const { collectionQuries } = require("../config/db");

const pendingQueries = async (req, res) => {
  try {
    const queries = await collectionQuries.find({ status: "pending" }).toArray();
    res.status(200).json({ success: true, queries });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching queries" });
  }
};

const resolvedQueries = async (req, res) => {
  try {
    const queries = await collectionQuries.find({ status: "resolved" }).toArray();
    res.status(200).json({ success: true, queries });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching resolved queries" });
  }
};



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

    // 1. Check Query
    const query = await collectionQuries.findOne({ _id: new ObjectId(id) });

    if (!query) {
      return res.status(404).json({
        success: false,
        message: "Query not found"
      });
    }

    // 2. Update DB
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

    // 3. Send Email Safely (Mail error se server crash nahi hoga)
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: query.contact,
        subject: "Your Query Has Been Resolved",
        html: `
          <h2>Hello,</h2>
          <p>Your query has been resolved by our support team.</p>
          <p><b>Topic:</b> ${query.topic}</p>
          <p><b>Admin Reply:</b> ${message}</p>
          <p>If you still have any issues, feel free to contact us again.</p>
          <br>
          <p>Regards,</p>
          <p>AuraAvenue Support Team</p>
        `
      });
    } catch (mailError) {
      console.error("Mail Send Error (Skipped):", mailError.message);
    }

    // 4. Always JSON Return
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

module.exports = {
  pendingQueries,
  updateQueryStatus,
  resolvedQueries
};