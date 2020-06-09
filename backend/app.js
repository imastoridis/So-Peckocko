const express = require ('express')
const bodyParser = require ('body-parser')
const mongoose = require ('mongoose')
const path = require('path')
var cors = require('cors')

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user')

mongoose.connect('mongodb+srv://imast:RDWDcfl6nUIY6alX@cluster0-ksajj.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express()

app.use((req, res, next) => { 
  res.setHeader('Access-Control-Allow-Origin', '*'); //* veut dire tout le monde
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

/*
app.use((req, res) => {
  console.log(res.json({ message: 'Votre hello bien été reçue !' })); 
});*/

app.use(bodyParser.json()) //transforme l'objet de la requet en json
app.use(cors())

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes)


module.exports = app;
