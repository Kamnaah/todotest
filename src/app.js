const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

const registerRoute = require("./routes/registerRoutes");
const loginRoute = require("./routes/loginRoutes");
const taskRoute = require("./routes/taskRoutes");
app.use(cors());

app.use("/register",registerRoute);
app.use("/login",loginRoute);
app.use("/task",(req,res,next)=>{
    try{
        const token = req.headers.authorization;
        const userData = jwt.verify(token,secret);
        req.user = userData.data;
        next();
    }
    catch(e){
        res.status(400).json({status:"failed",message:"Not Authorized"})
    }
});

app.use("/task",taskRoute);

module.exports = app;