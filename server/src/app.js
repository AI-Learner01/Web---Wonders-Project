// Sabse pehle env variables load hone chahiye!
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

const destinationRoutes = require("./routes/destinationRoutes");
const packageRoutes = require("./routes/packageRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

// Define all your allowed base URLs here
const allowedOrigins = [
  "https://web-wonders-project.vercel.app",
  process.env.CLIENT_URL, // Your new deployment URL from .env
].filter(Boolean); // Removes undefined values

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman, mobile apps, or server-to-server requests
      if (!origin) return callback(null, true);

      // Check if origin is exactly in our list, or is a Vercel preview, or is localhost
      const isAllowed =
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app") ||
        origin.startsWith("http://localhost:");

      if (isAllowed) {
        callback(null, true);
      } else {
        console.warn(`Blocked by CORS: ${origin}`); // Helpful for debugging
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Explicitly allow PATCH
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/notifications", require("./routes/notificationRoutes"));

module.exports = app;