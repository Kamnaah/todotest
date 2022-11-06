const express = require("express");
const router = express.Router();
const user = require("../modals/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET

router.use(express.json());
router.use(express.urlencoded({extended:false}));

router.get("/",async(req,res)=>{
    res.send("login route");
});

router.post("/",async(req,res)=>{
    const userName = req.body.userName;
    var password = req.body.password;
    const userdata = await user.findOne({userName:userName});

    if(userdata){
        var result = await bcrypt.compare(password,userdata.password);
        if(result){
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: userdata._id
              }, secret);
            res.status(200).json({status:"Success",token:token})
        }else{
            res.status(400).json({status:"failed",message:"Password is Wrong"});
        }
    }else{
        res.status(400).json({status:"failed",message:"User does not exists"});
    }


})

module.exports = router;