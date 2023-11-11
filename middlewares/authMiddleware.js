import { UnauthenticatedError } from '../errors/customErrors.js'
import { verifyJWT } from '../utils/tokenUtils.js'

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    throw new UnauthenticatedError('authentication invalid')
  }

  try {
    // IF THE TOKEN IS VALID/PRESENT, ADD USER PROPERTY TO THE REQUEST OBJECT WITH VALUE = {userId:userId}
    const { userId } = verifyJWT(token)
    req.user = { userId }
    req.body.createdBy = userId
    next()
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid')
  }
}
