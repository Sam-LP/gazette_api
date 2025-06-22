import mongoose from "mongoose"
import mongooseUniqueValidator from "mongoose-unique-validator"

const userFields = {
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true}
}

const userSchema = mongoose.Schema(userFields)

// Utilisation du plugin de validation des données
userSchema.plugin(mongooseUniqueValidator)

const UserModel = mongoose.model('User', userSchema)

/**
 * Vérifie que la syntaxe d'une chaîne de caractères correspond au format d'une adresse e-mail
 * @param {string} email 
 * @returns true si la syntaxe de l'email est valide
 */
UserModel.isEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return pattern.test(email) 
}

export default UserModel
