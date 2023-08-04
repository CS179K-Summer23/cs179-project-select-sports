//For server setting up modules, initialize and deal with traffic(client requests)

//importing express dependency
const express = require('express');
//instance of express 
const app = express();
const port= process.env.port || 4000; 
const auth = require('./routes/Auth.js');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');



mongoose
  .connect("mongodb+srv://fazma001:fazma001@cluster0.q21z1na.mongodb.net/SelectSports",{useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.use('/auth', auth);


//Defining incoming requests 
app.get('/',(req,res)=>{
    res.send("<h1>Get request Successful!</h1>");
})

app.listen(port, ()=>{
    console.log("Server is running on ", port);
})