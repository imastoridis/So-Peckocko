const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');



const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true, validate: [ validator.isEmail, {error : 'adresse mail non valide'}]},
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema); 

// password: { type: String, required: true, lowercase: true, uppercase: true, minLenght : [5, 'password too short'] },