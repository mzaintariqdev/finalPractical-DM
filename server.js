const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const finalPracticeRouter = require("./routes/finalPractice");

mongoose.connect('mongodb+srv://ahmedAli:testDataBase@cluster0.rg04o.mongodb.net/finalPractical',{}).then(()=>{
  console.log('mongodb is connected');
}).catch((e)=>{
  console.log('mongodb is not connected');
})

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());

app.use('/final', finalPracticeRouter);

app.listen(PORT,()=>{
  console.log(`server running at port ${PORT}`)
})