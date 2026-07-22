const express = require("express");
require("dotenv").config();//  .env
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");


/**
 * do not delete commntes
 * 
 * //account creation and login done but cookie consept is not checked fully
 * 
 * future me ham direct home page pe jayege withot login after singup
 * we can ask you want to direct login (add a redio byutton)
 * 
 */

const app = express();


const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const db = client.db("WebWonderLocal");//database selected
const collectionUserData = db.collection("UserData");//collection selected for users
const collectionOtps = db.collection("Otps");//collection selected for otps
async function connectDB() {
    try {
        await client.connect();  //connect to mongodb server
        console.log("MongoDB Connected");
    }
    catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD
    }
});

async function generateOtp(email) {

    // Delete previous OTPs for this email
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
        subject: 'Travel and Tourism OTP Verification',
        text: `Your OTP code is: ${otp}`
    });
    console.log(`OTP sent to ${email}: ${otp}`);
}


    

app.use(cors({
    origin: "http://localhost:5173",//this is the port of react 
    credentials: true

}));

app.use(express.json());

app.use(cookieParser());


app.post("/send-otp", async (req, res) => {
    const { email } = req.body;
    await sendOtp(email);
    res.status(200).json({ "success": true, "message": "OTP sent successfully" });
});

app.post("/verify-otp", async (req, res) => {
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
});


app.post("/login", async (req, res) => {
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
});

app.post("/signup", async (req, res) => {
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
});




connectDB().then(() => {
    app.listen(5000, () => {
        console.log("Server is running on port 5000");
    });
});
