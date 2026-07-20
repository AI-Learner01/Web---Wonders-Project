// Sabse pehle env variables load hone chahiye!
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// app.use("/api/auth", authRoutes);//means at fatching /api/auth/send-otp
app.use("/auth",authRoutes);

module.exports = app;