import express from "express"
const router = express.Router()

import stuffController from '../controllers/stuff.js'
import auth from '../middleware/auth.js'



/**
 * Stuff routes
 */
router.get("/", stuffController.getAllThings)
router.get('/:id', stuffController.getThing)
router.post('/', stuffController.createThing)
router.put('/:id', stuffController.updateThing)
router.delete('/:id', stuffController.deleteThing)


// Affectation des routes aux fonctions du controller avec authentification
// router.get("/", auth, stuffController.getAllThings)
// router.post('/', auth, stuffController.createThing)
// router.put('/:id', auth, stuffController.updateThing)
// router.delete('/:id', auth, stuffController.deleteThing)

export default router