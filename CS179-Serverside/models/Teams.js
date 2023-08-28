const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  email: String,
  teamIDs: [String]
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;







