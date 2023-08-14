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
const nodemailer = require("nodemailer");


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
app.post('/sendEmail',(req,res)=>{
  let user = req.body;
  SendEmail(user,info=>{
    console.log("Email was successfully Sent");
    res.send(info);
  });
}
);

async function SendEmail(user, callback){
  
  //Transporter, using google Gmail’s SMTP server is a free service offered by Google
  let transporter =nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
      user:'selectsports2023@gmail.com',
      pass:'xqmnbqbllzjtyrxg',
    }
  });
  let mailOptions={
    from: '"Select Sports" <selectsports2023@gmail.com>',
    to: 'azmachaudhry@gmail.com',
    subject: "Welcome to Select Sport",
    html: user.body
  };
  try {
    let info = await transporter.sendMail(mailOptions);
    callback(info);
  } catch (error) {
    console.error("Mail Not sent", error);
    callback(error);
  }
}
app.listen(port, ()=>{
    console.log("Server is running on ", port);
})

