// Import necessary modules
const mongoose = require('mongoose');

// Define the schema for your form data
const EventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    minlength: 4
  },
  contactNo: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10
  },
  strength: {
    type: String,
    required: true,
    minlength: 4
  },
  year: {
    type: String,
    enum: ['1st', '2nd', '3rd'], // Only allows '1st', '2nd', or '3rd'
    required: true
  },
  organization: {
    type: String,
    required: true,
    minlength: 4
  },
  department: {
    type: String,
    required: true,
    minlength: 4
  },
  maxRadius: {
    type: Number
  }
});

// Create a model using the schema
const Event = mongoose.model('Event', EventSchema);

// Export the model
module.exports = Event;
