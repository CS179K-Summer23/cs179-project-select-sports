const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, unique: true },
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    favorite_sport: { type: String },
    description: { type: String },
    profileID: { type: Number },
    dailyAccessTime: { type: Number },
    points: { type: Number, default: 0 },
    allTimeEarnedPoints: { type: Number, default: 0 },
    allTimeLostPoints: { type: Number, default: 0 }
});


userSchema.methods.gainPoints = function(points) {
    this.points += points;
    this.allTimeEarnedPoints += points;
};

userSchema.methods.losePoints = function(points) {
    this.points -= points;
    this.allTimeLostPoints += points;
};

module.exports = mongoose.model('UserData', userSchema);