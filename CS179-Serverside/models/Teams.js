



const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserTeamsSchema = new Schema({

        //EventID: {type: String},
        TeamID: Schema.Types.Mixed,
       
       });

const TeamSchema = new Schema({
   email:{type: String},
   UserTeams: [UserTeamsSchema], 
  
});

const Teams = mongoose.model('Teams', TeamSchema);

module.exports = Teams;

