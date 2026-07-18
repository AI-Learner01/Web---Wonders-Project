const express = require("express");
require("dotenv").config();//  .env
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");


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
const collection = db.collection("UserData");//collection selected for users
async function connectDB() {
    try {
        await client.connect();  //connect to mongodb server
        console.log("MongoDB Connected");
    }
    catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}


app.use(cors({
    origin: "http://localhost:5173",//this is the port of react 
    credentials: true

}));

app.use(express.json());

app.use(cookieParser());


app.post("/login", async (req, res) => {
    const { emailOrPhone, password } = req.body;

    

    const user = await collection.findOne({ $or: [{ "email": emailOrPhone }, { "phone": emailOrPhone }] });

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
        else{
            res.status(401).json({ "success": false, "message": "Invalid passWord" });
        }
    }
    else
    {
        res.status(401).json({ "success": false, "message": "You did Not have account" });
    }
});

app.post("/signup", async (req, res) => {
    const { name, email, phone, password } = req.body;

    //check email exits ?
    const existingUserEmail = await collection.findOne({ "email": email });
    const existingUserPhone = await collection.findOne({ "phone": phone });

    if (!existingUserEmail && !existingUserPhone) {

        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10
        await collection.insertOne({
            "name": name,
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
