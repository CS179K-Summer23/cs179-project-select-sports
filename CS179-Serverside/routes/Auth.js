const router = require('express').Router();


const UserData = require("../models/UserData");
const Bets = require("../models/Bets");


const bcrypt = require('bcrypt');
const { response } = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secretkey = "SportsSelectSecret";
const VerifyAuth = require('../middleware/VerifyAuth');

router.post('/register', (req,res)=>{
    bcrypt.hash(req.body.password,10, (err, hash)=>{
        if(err){
            return res.json({success:false, message:"Hashing Failed"});
        }
        else{
            const user = new UserData({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                points: req.body.points,
            })
       
       
            user.save()
            .then(()=>{
                res.json({success:true, message:"Account Created"})
               
            })
            .catch((err)=>{
                if(err.code === 11000){
                    
                    return res.json({success:false, message:"Email Already Exists!"});

                }
                res.json({success:false, message:"Account Creation Failed"});
            })

     }

    });
    
});


router.post('/SignIn', (req, res)=>{
    UserData.find({email:req.body.email}).exec().then((response)=>{
        if(response.length<1){
            return res.json({success: false, message:"Invalid Email"});
        }
     else{
           const user = response[0];
           bcrypt.compare(req.body.password, user.password, (err, ret)=>{
            if(ret){
                const payload ={
                    userId: user._id

                }
                const token = jwt.sign(payload, secretkey );
                return res.json({success:true, token:token, message:"Successfully logged in"});
            }else{
                return res.json({success:false, message:"Invalid Password"})
            }
        })
    }
        

    }).catch(err =>{
        res.json({success: false, message:"Login Failed"});
    })
});

router.get('/profile', VerifyAuth, (req, res)=>{
   
    const userId= req.userData.userId
    //console.log(userId);
    UserData.findById(userId).exec().then((response)=>{
        res.json({success:true, data:response})

    }).catch(err=>{
        res.json({success:false, message: "Fetching User failed"})
    })
});

router.post('/profileEdit', (req, res) => {
  const { email, profileID, favorite_sport, description } = req.body;

  UserData.findOneAndUpdate({ email: email }, { profileID: profileID, favorite_sport: favorite_sport, description: description }, { new: true })
    .then(updatedUser => {
      if (!updatedUser) {
        return res.json({ success: false, message: "User not found" });
      }
      return res.json({ success: true, message: "Profile updated successfully", data: updatedUser });
    })
    .catch(err => {
      console.error(err);
      return res.json({ success: false, message: "Error updating profile" });
    });
});


router.post('/myBets', async (req,res)=>{
   console.log('I was sent here with', req);
        const { email, EventID, BettingTeamID } = req.body;

try{
        let myBet =await Bets.findOne({ email });

        //User's FIRST BET EVEEEEEAAAAAAA

        if(!myBet){
            myBet = new Bets({ email, PlacedBets: [] });
        }

        if (!myBet.PlacedBets) {
            myBet.PlacedBets = []; 
          }

         myBet.PlacedBets.push({EventID, BettingTeamID });

         await   myBet.save();

          
                res.json({success:true, message:"Bet Placed Successfully! Come Back for results :)"});
               
}





catch(err){
    console.error("Error placing bet:", err);
                res.json({success:false, message:"Error Placing Bet"});
            }

     

    });


    router.get('/myBets/:email', async (req, res) => {
        const { email } = req.params;
      
        try {
            let myBet =await Bets.findOne({ email });
          
      
          if (!myBet) {
            return res.json({ error: 'No Bets Placed' });
          }
          else{
            
            return res.json(myBet);
          }
      
          
        } catch (error) {
          res.status.json({success:false, message:"Error Getting Bets" });
        }
      });
    















module.exports = router;


