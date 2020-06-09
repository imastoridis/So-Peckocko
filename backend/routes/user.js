const express = require('express'); //Création router
const router = express.Router(); //Création router

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup); //post car le front va envoyer des infos
router.post('/login', userCtrl.login);

module.exports = router;