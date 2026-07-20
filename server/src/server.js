const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
require("dotenv").config();

const app = require("./app");
const { connectDB } = require("./config/db");

const PORT = process.env.PORT;

// Initialize Database Connection before Booting up the Server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});