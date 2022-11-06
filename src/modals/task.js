const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    tasks :[
        {activity:{type:String,required:true},
        status:{type:String,required:true},
        timetaken:{type:String}}],
    user : {type:Schema.Types.ObjectId,ref:"user"}
})

const task = mongoose.model("task",taskSchema);

module.exports = task;