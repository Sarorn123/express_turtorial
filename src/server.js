const express = require("express");
const app = express();
require('dotenv').config();
require("./db");

// route 
const userRoute = require("./routes/userRoute");
const songRoute = require("./routes/songRoute");


app.use(express.json());

app.use("/user", userRoute);
app.use("/song", songRoute);

 
app.listen(3000, () => {
    console.log("Running in port = " + 3000);
})