const router = require('express').Router();


const UserData = require("../models/UserData");
const Bets = require("../models/Bets");

const Teams = require("../models/teams");





const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretkey = "SportsSelectSecret";
const VerifyAuth = require('../middleware/VerifyAuth');



router.post('/ValidatingEmail', (req, res) => {
   
  UserData.findOne({ email: req.body.email }).exec()
    .then((user) => {
      if (!user) {
        return res.json({ success: false, message: "Invalid Email" });
      } else {
          return res.json({ success: true, message: "Email Verified" });
      }
    })
    .catch(err => {
      res.json({ success: false, message: "Authentication Failed" });
    });
});

router.post('/reset', (req, res) => {

  bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
          return res.json({ success: false, message: "Hashing Failed" });}
      else{
          
  console.log(hash);
  UserData.findOneAndUpdate({email : req.body.email }, { password:hash }, { new: true })
      .then(successUpdate => {
          if (!successUpdate) {
              return res.json({ success: false, message: "User not found" });
          }
          return res.json({ success: true, message: "Password Reset Successful", data: successUpdate });
      })
      .catch(err => {
          console.error(err);
          return res.json({ success: false, message: "Error updating user details" });
      });
  }
});
});



router.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.json({ success: false, message: "Hashing Failed" });
        } else {
            const user = new UserData({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                points: req.body.points,
            });

            const bets = new Bets({
              email: req.body.email,
            });

            const teams = new Teams({
              email: req.body.email,
            });

          user.save()
          teams.save()
          bets.save()
            .then(() => {
              res.json({ success: true, message: "Account Created" });
            })
              .catch((err) => {
                    if (err.code === 11000) {
                        return res.json({ success: false, message: "Email Already Exists!" });
                    }
                    res.json({ success: false, message: "Account Creation Failed" });
                });
        }
    });
});

router.post('/SignIn', (req, res) => {
    UserData.findOne({ email: req.body.email }).exec()
      .then((user) => {
        if (!user) {
          return res.json({ success: false, message: "Invalid Email" });
        } else {
          bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
            if (isMatch) {
              const payload = {
                userId: user._id
              };
              const token = jwt.sign(payload, secretkey);
              return res.json({ success: true, token: token, message: "Successfully logged in" });
            } else {
              return res.json({ success: false, message: "Invalid Password" });
            }
          });
        }
      })
      .catch(err => {
        res.json({ success: false, message: "Login Failed" });
      });
  });
  

router.get('/profile', VerifyAuth, (req, res) => {
  const userId = req.userData.userId;
  UserData.findById(userId).exec()
    .then((response) => {
      res.json({ success: true, data: response });
  })
  .catch(err => {
    res.json({ success: false, message: "Fetching User failed" });
  });
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

router.post('/DailyLogin', (req, res) => {
  const { email, points, dailyAccessTime} = req.body;

  UserData.findOneAndUpdate({ email: email }, { points: points , dailyAccessTime: dailyAccessTime}, { new: true })
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
    await myBet.save();

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
    

      router.post('/AddPoints', (req, res) => {
        const { email, points} = req.body;
      
        UserData.findOneAndUpdate({ email: email }, { points: points}, { new: true })
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
  
  router.get('/getFavTeams/:email', (req, res) => {
    const userEmail = req.params.email;
        
    Teams.findOne({ email: userEmail })
      .then((team) => {
        if (team) {
          res.status(200).json({ success: true, data: team.teamIDs });
        } else {
          res.status(404).json({ success: false, message: 'User not found' });
        }
      })
      .catch((error) => {
        res.status(500).json({ success: false, message: 'Error fetching teams', error });
      });
  });


  router.post('/addTeamToFavorites', async (req, res) => {
    const { userEmail, teamId } = req.body;
  
    try {
      const user = await Teams.findOne({ email: userEmail });
      
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // Add the team ID to the teamIDs array if not already present
      if (!user.teamIDs.includes(teamId)) {
        user.teamIDs.push(teamId);
        await user.save();
      }
  
      return res.status(200).json({ success: true, message: 'Team added to favorites' });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Error adding team to favorites', error });
    }
  });

  router.post('/removeTeamFromFavorites', async (req, res) => {
    const { userEmail, teamId } = req.body;
  
    try {
      const user = await Teams.findOne({ email: userEmail });
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // Remove the team ID from the teamIDs array if present
      if (user.teamIDs.includes(teamId)) {
        user.teamIDs = user.teamIDs.filter(id => id !== teamId);
        await user.save();
      }
  
      return res.status(200).json({ success: true, message: 'Team removed from favorites' });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Error removing team from favorites', error });
    }
  });
  
  


     
      router.post('/forgot-password', (req, res) => {
        const { email } = req.body;
      
        UserData.findOne({ email })
          .then(user => {
            if (!user) {
              return res.json({ success: false, message: 'User with this email not found' });
            }
      
            const resetToken = jwt.sign({ email }, secretkey, { expiresIn: '1h' });
            const resetLink = `http://localhost:4000/auth/forgot-password/${resetToken}`;
      
            const emailContent = {
              to: user.email,
              subject: 'Password Reset Link',
              text: `Click on the following link to reset your password: ${resetLink}`
            };


            console.log('Password reset link:', resetLink);
      
            res.json({ success: true, message: 'Password reset link sent to your email' });
          })
          .catch(err => {
            res.json({ success: false, message: 'Error finding user' });
          });
      });

router.post('/reset-password', (req, res) => {
  const { token, newPassword } = req.body;

  try {
      const decodedToken = jwt.verify(token, secretKey);

      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      UserData.findOneAndUpdate({ email: decodedToken.email }, { password: hashedPassword })
          .then(() => {
              res.json({ success: true, message: 'Password reset successful' });
          })
          .catch(err => {
              res.json({ success: false, message: 'Error resetting password' });
          });
  } catch (err) {
      res.json({ success: false, message: 'Invalid or expired token' });
  }
});

module.exports = router;
