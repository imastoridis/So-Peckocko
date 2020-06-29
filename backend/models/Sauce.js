const mongoose = require('mongoose');

//Sauce Mongoose Schema

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true, maxlength : [15, 'Nombre de caractéres limité a 15'] },
  manufacturer: { type: String, required: true, maxlength : [15, 'Nombre de caractéres limité a 15'] },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true, maxlength : [15, 'Nombre de caractéres limité a 15'] },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: {type: Number, required: false, default:0},
  dislikes: { type: Number, required: false, default:0 },
  usersLiked: { type: [String], required: false },
  usersDisliked: { type: [String], required: false },
});

module.exports = mongoose.model('Sauce', sauceSchema); // export du modele comme un modele mongoose . ('nom du modele', le modele qu'on veut utiliser)
