
/*
//importing mongoose to use MongoDb
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//defining schema
const userSchema = new Schema({
        name: {type: String},
        email:{type: String, unique:true},
        password: {type: String, required:true},
        favorite_sport: {type: String},
        description: {type: String},
        profileID: {type: Number}
});

//creating model for db
module.exports = mongoose.model('UserData', userSchema)
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlacedBetSchema = new Schema({

 EventID: {type: String, unique:true},
 BettingTeamID: Schema.Types.Mixed,

});

const betsSchema = new Schema({
   email:{type: String, unique:true},
   PlacedBets: [PlacedBetSchema], 
  
});

const Bets = mongoose.model('Bets', betsSchema);

module.exports = Bets;

