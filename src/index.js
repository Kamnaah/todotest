const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost/todoapp",()=>console.log("Database is connected"));

app.listen(port,()=>console.log("Server is running at "+port));