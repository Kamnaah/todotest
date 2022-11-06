const express = require("express");
const router = express.Router();
const user = require("../modals/user");
const bcrypt = require("bcrypt");

router.use(express.json());
router.use(express.urlencoded({extended:false}));

router.get("/",async(req,res)=>{
    res.send("register route");
});

router.post("/",async(req,res)=>{
    console.log(req.body);
    const userName = req.body.userName;
    var password = req.body.password;
    const cnfPassword = req.body.cnfPassword;

    const userdata = await user.findOne({userName:userName});

    if(password!==cnfPassword){
        res.json({status:"failed",message:"Password Doesnot Match"});
        return;
    }

    password = await bcrypt.hash(password,10);
    if(!userdata){
        const data = await user.create({userName,password});
        res.status(201).json({status:"success",data:data});
    }else{
        res.json({status:"failed",message:"User Already exsits"});
    }
})

module.exports = router;