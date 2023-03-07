import { authIs } from '../utils'
const auth = async (req, res, next) => {
  // const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY
  const Authorization=req.header('Authorization')||''
  const token = Authorization.replace('Bearer ', '')
  if (!authIs(token)) {
    try {
      throw new Error('Invalid token')
      next()
    }
    catch (error) {
      res.send({ status: 'Unauthorized', message: error.message ?? 'Please authenticate.', data: null })
    }
  }
  else {
    next()
  }
}

export { auth }
