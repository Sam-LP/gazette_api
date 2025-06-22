import Thing from "../models/thing.js"

const stuffController = {
  
  createThing : (req, res) => {
    // Supression _id car MongoDB le génère automatiquement
    delete req.body._id
    
    // Création d'un nouvel objet (Mongoose model)
    const thing = new Thing({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      userId: req.body.userId,
      price: parseFloat(req.body.price),
    })
    
    // Enregistrement en base de données
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(
        error => {
          res.status(400).json({ error: error})
        }
      )
  },

  getAllThings : (req, res) => {
    Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }))
    },

    getThing: (req, res) => {
      //Récupération article avec l'id correspodant
    },

    // TODO : Implémenter la modification d'un Thing
    updateThing: (req, res) => {
      
    },

    // TODO : Implémenter la suppression
    deleteThing: (req, res) => {

    }
}


export default stuffController