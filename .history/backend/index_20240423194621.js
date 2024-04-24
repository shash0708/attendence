const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());



const uri =
  "mongodb+srv://Rohi:EgWbIbD27nNOQipJ@cluster0.eqsiiyv.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri);
const con = mongoose.connection;
con.once("open", () => {
  console.log("Mongo DB connected");
});


const port =9000;

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})