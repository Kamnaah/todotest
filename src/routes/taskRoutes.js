const express = require("express");
const router = express.Router();
const user = require("../modals/user");
const task = require("../modals/task");

router.use(express.json());
router.use(express.urlencoded({extended:false}));

router.get("/",async(req,res)=>{
    try{
        const data = await task.findOne({user:req.user});
        if(!data){
            res.json({data:[]});
            return;
        }
        res.status(201).json({data:data.tasks});
    }catch(e){
        res.status(400).json({status:"failed",message:e.message})
    }
})


router.post("/add",async(req,res)=>{
    try{
        const data = await task.findOne({user:req.user});
        if(data){
            req.body.status = "pending"
            data.tasks.push(req.body);
            await task.findByIdAndUpdate(data._id,{tasks:data.tasks});
            res.status(201).json({status:"Success"});
        }else{
            req.body.status = "pending"
            let tasks = [req.body];
            const data = await task.create({
                tasks:tasks,
                user:req.user
            })
            res.status(201).json({status:"Success",data:data});
        }
    }catch(e){
        res.status(400).json({status:"failed",message:e.message})
    }

});

module.exports = router;