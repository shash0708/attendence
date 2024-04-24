const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
app.use(cors());

const Router = express.Router();
const uri ="mongodb+srv://shashankpeddinti07:NO13p1MWQqgcsIWc@cluster0.ssab6nz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri);
const con = mongoose.connection;
con.once("open", () => {
  console.log("Mongo DB connected");
});

Router.post('/events',async(req,res)=>{
    try{
        const event = new Event(req.body);

        await event.save();
        res.status(201).send(event);
        
    }catch(err){
        res.status(400).


    }
})
const port =9000;

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})