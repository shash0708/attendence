const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
app.use(cors());

const router = express.Router();
const uri ="mongodb+srv://shashankpeddinti07:NO13p1MWQqgcsIWc@cluster0.ssab6nz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri);
const con = mongoose.connection;
con.once("open", () => {
  console.log("Mongo DB connected");
});

router.post('/events', async (req, res) => {
    try {
      // Extract event data from the request body
      const eventData = req.body;
  
      // Create a new event object using the extracted data
      const event = new Event(eventData);
      
      // Save the event to the database
      await event.save();
  
      // Send a success response
      res.status(201).json(event);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
})  
  
const port =9000;

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})