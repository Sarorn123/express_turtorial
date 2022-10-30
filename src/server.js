const express = require("express");
const app = express();
require('dotenv').config();
require("./db");
const path = require("path");

// route 
const userRoute = require("./routes/userRoute");
const songRoute = require("./routes/songRoute");

app.use(express.static(path.join(__dirname, '../uploads')));
app.use(express.json());

app.use("/user", userRoute);
app.use("/song", songRoute);

 
app.listen(3000, () => {
    console.log("Running in port = " + 3000);
});