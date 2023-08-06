//importing mongoose to use MongoDb
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//defining schema
const userSchema = new Schema({
        name: {type: String},
        email:{type: String, unique:true},
        password: {type: String, required:true},
        favorite_sport: {type: String},
        description: {type: String}
});

//creating model for db
module.exports = mongoose.model('UserData', userSchema)

