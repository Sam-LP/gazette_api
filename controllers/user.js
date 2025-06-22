import User from "../models/user.js"
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"

const userController = {

  /**
   * Création utilisateur
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   */
  signup: (req, res, next) => {

    if(!req.body.email) {
      return res.status(400).json({ message: "E-mail obligatoire" })
    }    
    if(!User.isEmail(req.body.email)) {
      return res.status(400).json({ message: "E-mail incorrect" })
    }    
    if(User.exists({ "email": req.body.email })) {
      return res.status(400).json({ message: "Cet e-mail est déjà utilisé" })
    }
    if(!req.body.password) {
      return res.status(400).json({ message: "Veuillez saisir un mot de passe" })
    }

    delete req.body._id
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        })
        user.save()
          .then(() => res.status(201).json({message: 'Utilisateur créé avec succès'}))
          .catch(error => { res.status(400).json(error)})
      })
      .catch(error => res.status(500).json({error}))
  },

  /**
   * Login
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   */
  login: (req, res, next) => {

    if(!req.body.email) {
      return res.status(400).json({ message: "E-mail obligatoire" })
    }    
    if(!User.isEmail(req.body.email)) {
      return res.status(400).json({ message: "Le format de l'e-mail est incorrect" })
    }
    if(!req.body.password) {
      return res.status(400).json({ message: "Mot de passe manquant" })
    }

    User.findOne({ email: req.body.email })
      .then(user => {
        if(!user) {
          return res.status(401).json({ message: "E-mail ou mot de passe incorrect"})
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if(!valid) {
              return res.status(401).json({ message: "E-mail ou mot de passe incorrect"})
            }
            res.status(200).json({
              userId: user._id,
              token: jsonwebtoken.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: "1h"}
              )
            })
          })
          .catch(error => res.status(500).json({ error }))
      })
      .catch(error => res.status(500).json({ error }))
  },

  /**
   * Mise à jour utilisateur
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   */
  updateOne: (req, res, next) => {
    return res.status(400).json({ message: `UPDATE ${req.params.id} ?` })

    res.status(200).json(req)

  },

  /**
   * Suppresion utilisateur
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   */
  deleteOne: (req, res, next) => {
    return res.status(400).json({ message: "DELETE ?" })
    console.log('DELETE')
    res.status(200).json(req)
  }

}

export default userController