import express from "express"
import userController from "../controllers/user.js"
const router = express.Router()

// Inscription
router.post('/signup', userController.signup)

// Connection
router.post('/login', userController.login)

// Modification
router.put('/:id', userController.updateOne)

// Suppression
router.delete('/:id', userController.deleteOne)


export default router