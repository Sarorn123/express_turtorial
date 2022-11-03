const express = require("express");
const app = express();
require('dotenv').config();
require("./db");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// route 
const userRoute = require("./routes/userRoute");
const songRoute = require("./routes/songRoute");
const User = require("./model/User");

// middleware 
const {authorization} = require("./middleware/authorization");
const songAuth = require("./middleware/songAuth");

app.use(express.static(path.join(__dirname, '../uploads')));
app.use(express.json());

app.use("/user", userRoute);
app.use("/song", songRoute);

const getToken = (user) => {
    return jwt.sign({
        data: user
    }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });
}

app.post("/login", async (req,res) => {

    if(!req.body.email || !req.body.password){
        res.json({message: "email and password is need !"});
    }

    const user =  await User.findOne({
        email: req.body.email,
    });

    const check  = await bcrypt.compare(req.body.password, user.password);
    if(check){
       const access_token = getToken(user);
       res.json({user , access_token});
    }else{
        res.status(401).json({message: "User Not Found!"});
    }
});


app.get("/test", authorization(["admin",  "user"]),(req,res) => {
    res.json({message: "This is api for admin"});
});

app.post("/test", authorization(["admin"]),(req,res) => {
    res.json({message: "post success"});
});

app.patch("/editSong/:id",songAuth,(req,res) => {
    res.json({message: "Edit Song"});
});
 
app.delete("/delectSong/:id",songAuth,(req,res) => {
    res.json({message: "Delete Song"});
});


app.listen(3000, () => {
    console.log("Running in port = " + 3000);
});