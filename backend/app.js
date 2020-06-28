require('dotenv').config();
const express = require ('express')
const bodyParser = require ('body-parser')
const mongoose = require ('mongoose')

const path = require('path')
var cors = require('cors')


const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user')

const app = express()

// Connection a la Base de Donnée MongoDB
//& masquage des données grâce à DOTENV package.




//mongodb+srv://imast:<password>@cluster0-ksajj.mongodb.net/<dbname>?retryWrites=true&w=majority
//mongoose.connect('mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-ksajj.mongodb.net/test?retryWrites=true&w=majority',

const ID = process.env.ID;
const MDP = process.env.PASS;

mongoose.connect(`mongodb+srv://${ID}:${MDP}@cluster0-ksajj.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



app.use((req, res, next) => { 
  res.setHeader('Access-Control-Allow-Origin', '*'); //* veut dire tout le monde
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use(bodyParser.json()) //transforme l'objet de la requete en json
app.use(cors())

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes)


module.exports = app;
