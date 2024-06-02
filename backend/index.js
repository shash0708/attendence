const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
const EventSchema = require('./models/event');
const dotenv = require('dotenv');
const Link = require('./models/Link')
const crypto = require('crypto');
const Student = require('./models/Student');
const apiKey = process.env.GOOGLE_DISTANCE_MATRIX_API_KEY;
const calculateAndCheckDistance = require('./utils/distance'); // Adjust the path as per your file structure

function setHeaders(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}

app.use(setHeaders);

const corsOptions = {
  origin: 'https://attendence-49cr.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true, // If your requests include cookies or other credentials
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


dotenv.config();
app.use(express.json());
const router = express.Router();
const uri =process.env.MONGO_URI
mongoose.connect(uri);
const con = mongoose.connection;
con.once("open", () => {
  console.log("Mongo DB connected");
});

app.post('/update', async (req, res) => {
    try {
        res.send('Update endpoint reached');

      // Extract event data from the request body
      const {eventName,contactNo,strength,year,organization,department,maxRadius,adminLocation} = req.body;
      // Create a new event object using the extracted data

      const lowercaseEventName = eventName.toLowerCase();


      const event = new EventSchema({
        eventName: lowercaseEventName // Use lowercaseEventName here
        ,contactNo,strength,year,organization,department,maxRadius,adminLocation
      })
      // Save the event to the database
      const savedNote = await event.save();
      res.json(savedNote);
      
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
    

 app.get('/fetchEventDetails', async (req, res) => {
  try {
    const eventName = req.query.eventName; // Extract eventName from query parameters
    console.log(eventName);

    // Find events with matching eventName
    const events = await EventSchema.find({ eventName: eventName });

    if (events.length === 0) {
      return res.status(404).json({ message: 'No events found with the provided eventName' });
    }

    res.json(events);
  } catch (error) {
    console.log("Error in Fetching the events:", error);
    res.status(500).send("Internal Server Error");
  }
});

  
  app.post('/generate-link', async (req, res) => {
    const { eventName } = req.body; // Expecting event ID to be sent in the request
    try {
      const event = await EventSchema.findOne({ eventName: eventName });

        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const baseUrl = 'https://attendence-49cr.vercel.app/';
        const eventNameSlug = encodeURIComponent(event.eventName.replace(/\s+/g, '-').toLowerCase());
        const fullUrl = `${baseUrl}${eventNameSlug}/student-form`;

        const newLink = new Link({
            eventNameSlug,
            url: fullUrl,
        });
        await newLink.save();

        res.status(201).json({ link: fullUrl });
    } catch (error) {
        console.error('Error generating link:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/student-form', async (req, res) => {
  try {
    // Extract event data from the request body
    const { eventName,RegdNo,contactNo,year,Branch,email,userLocation} = req.body;
    const eventN = await EventSchema.findOne({ eventName });
    const Regd = await EventSchema.findOne({ RegdNo });


   if (Regd) {
      return res.status(404).json({ error: ' User Already exist' });
    }

    if (!eventN) {
      return res.status(404).json({ error: 'Event not found' });
    }
    console.log('Received form data:', req.body);

    try {
      const isWithinRadius = await calculateAndCheckDistance(eventN.adminLocation, userLocation, eventN.maxRadius);
    } catch (error) {
      if (error.message === 'Distance exceeds maximum radius') {
        return res.status(400).json({ error: 'User location is outside the allowed radius' });
      }
      throw error;
    }
    // Log or use the distance if needed
    // console.log(`Calculated distance: ${distance} meters`);    // Create a new event object using the extracted data
    const student = new Student({
      eventName,RegdNo,contactNo,Branch,year,email,userLocation  })
    console.log("sdfg")

  
    // Save the event to the database

    
    const savedaStudent = await student.save();
    res.json(savedaStudent);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
  
app.get('/fetchStudentData', async (req, res) => {
  try {
    const eventName = req.query.eventName; // Extract eventName from query parameters
    console.log(eventName);

    // Find events with matching eventName
    const events = await Student.find({ eventName: eventName });

    if (events.length === 0) {
      return res.status(404).json({ message: 'No events found with the provided eventName' });
    }

    res.json(events);
  } catch (error) {
    console.log("Error in Fetching the events:", error);
    res.status(500).send("Internal Server Error");
  }
});

  
const port =9000;

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})
