import jsonwebtoken from "jsonwebtoken"

export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jsonwebtoken.verify(token, 'RANDOM_TOKEN_SECRET')
    const userId = decodedToken.userId
    // res.Authorisation ?
    req.auth = {
      userId: userId
    }
    next()
  }
  catch(error) {
    // Envoi code 401 (Unauthorized) ainsi que l'erreur en JSon
    res.status(401).json({ error })
  }
}