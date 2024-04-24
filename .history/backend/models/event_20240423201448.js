const mongoose = require('mongoose');
const EventSchema = mongoose.Schema({
    
   Eventname:{
    type:String
   },
   EventDate:{
    type:Date,

   },
   ContactNo :{
    type:Number
   },
   Strength:{
    type:Number
   },
   YearSelected:{
    type:String
   },
   Organization:{
    type:String,
    default: "Assoc"
   }
   


});
