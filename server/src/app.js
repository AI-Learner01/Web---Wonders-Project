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

const allowedOrigins = [
  "https://web-wonders-project.vercel.app",
  process.env.CLIENT_URL,
].filter(Boolean); // Agar CLIENT_URL undefined ho toh hata dega

app.use(
  cors({
    origin: function (origin, callback) {
      // Postman, mobile apps ya server-to-server requests ke liye jinka origin nahi hota
      if (!origin) return callback(null, true);

      // Check karein ki kya origin Vercel ka koi bhi link hai ya hamari allowed list mein hai
      const isAllowed =
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app") ||
        origin.startsWith("http://localhost:");

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/bookings", bookingRoutes);
// app.use("/api/auth", authRoutes);//means at fatching /api/auth/send-otp
app.use("/auth",authRoutes);
app.use("/admin",adminRoutes);
app.use("/notifications", require("./routes/notificationRoutes"));

module.exports = app;