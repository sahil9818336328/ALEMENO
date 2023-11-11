import jwt from 'jsonwebtoken'

// CREATE JSON WEB TOKEN
export const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
  return token
}

// VERIFY JSON WEB TOKEN
export const verifyJWT = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  return decoded
}
