// Dépendances
import express from "express"
import env from './config/env.js'
import connectToDB from './config/db.js'
import userRoutes from './routes/user.js'
import stuffRoutes from './routes/stuff.js'



// Connexion à la base de données
// dev : mongoDB en local
/// prod : environnement en production
connectToDB(env.env)

// Initialisation application Express
const app = express()
app.use(express.json())

// GET à la racine (`/`) : redirection
app.get("/ ", (req, res) => {
  res.redirect('/stuff' )
})

// Liaison des routes aux méthodes du controller
app.use('/stuff', stuffRoutes)
app.use('/auth', userRoutes)


// Lancement du serveur en écoute sur le port défini dans le fichier .env concerné
app.listen(process.env.SERVER_LISTENING_PORT, () => {
  console.info(`Server Started at http://localhost:${process.env.SERVER_LISTENING_PORT}`)
})




    






