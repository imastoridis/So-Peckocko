const Sauce = require('../models/Sauce')
const fs = require('fs') //filesystem



//Create a new sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id; //l'id est généré automatiquement, donc on le delete ??
  const sauce = new Sauce({ // création d'un nouveau sauce avec les données du body
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save() // on save le nouveau sauce
    .then(() => res.status(201).json({ message: 'Objet enregistré !'})) //promesse 
    .catch(error => res.status(400).json({ error }));
}

//Modify one sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

//Delete one sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

//Get one sauce
exports.getOneSauce = (req, res, next) => { 
  Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce)) //renvoi la sauce si elle existe
      .catch(error => res.status(404).json({ error }));
  };

// Get all the sauces
exports.getAllSauces = (req, res, next) => { 
  Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
  }

//Like a sauce
exports.likeSauce = (req, res, next) => {
  switch (req.body.like) {
    // Défault = 0
    // Verification que l'utilisateur n'a pas déjà LIKER la sauce
    case 0:
      Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
          if (sauce.usersLiked.find(user => user === req.body.userId)) { //or sauce.usersLiked.includes(req.body.userId) 
            Sauce.updateOne({ _id: req.params.id }, {
              $inc: { likes: -1 },
              $pull: { usersLiked: req.body.userId },
              _id: req.params.id
            })
              .then(() => { res.status(201).json({ message: 'Ton avis a été pris en compte!' }); })
              .catch((error) => { res.status(400).json({ error: error }); });

              // Verification que l'utilisateur n'a pas déjà DISLIKER la sauce
          } if (sauce.usersDisliked.find(user => user === req.body.userId)) { //or sauce.usersDisliked.includes(req.body.userId)
            Sauce.updateOne({ _id: req.params.id }, {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId },
              _id: req.params.id
            })
              .then(() => { res.status(201).json({ message: 'Ton avis a été pris en compte!' }); })
              .catch((error) => { res.status(400).json({ error: error }); });
          }
        })
        .catch((error) => { res.status(404).json({ error: error }); });
      break;
    //likes = 1
    case 1:
      Sauce.updateOne({ _id: req.params.id }, {
        $inc: { likes: 1 },
        $push: { usersLiked: req.body.userId },
        _id: req.params.id
      })
        .then(() => { res.status(201).json({ message: 'Ton like a été pris en compte!' }); })
        .catch((error) => { res.status(400).json({ error: error }); });
      break;
      
    //likes = -1
    case -1:
      Sauce.updateOne({ _id: req.params.id }, {
        $inc: { dislikes: 1 },
        $push: { usersDisliked: req.body.userId },
        _id: req.params.id
      })
        .then(() => { res.status(201).json({ message: 'Ton dislike a été pris en compte!' }); })
        .catch((error) => { res.status(400).json({ error: error }); });
      break;
    default:
      console.error('not today : mauvaise requête');
  }
}
/*
exports.dislikeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(() => {
      let dislikes = []
      dislikes.push({ dislikes_count: 1})
      res.status(200).json(dislikes)
    })
    .catch(error => res.status(404).json({ error }));

let likes = []
      likes.push({ likes_count: 1})
      res.status(200).json(likes)



        let likes = []
      if (like = 1) {
        usersLiked.push('userId')
        res.status(200).json(likes)
      } else if (like = -1)
        usersDisliked.push( 'userId' )
        res.status(200).json(likes)
}*/