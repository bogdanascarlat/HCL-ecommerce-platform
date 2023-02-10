import jwt from 'jsonwebtoken'

const TESTING = true

export const getAverageOfNumbers = (...numbers) => {
  if (numbers.length === 0) {
    return 0
  }
  let sum = 0
  numbers.forEach((number) => {
    sum = sum + number
  })
  return sum / numbers.length
}

export const decodeJWT = (headerAuthorizationString) => {

  if(headerAuthorizationString === 'LOGIN'){
    throw new Error('LOGIN STATE')
  }

  if (!headerAuthorizationString.includes('Bearer ')) {
    throw new Error('JWT invalid format header string')
  }

  const token = headerAuthorizationString.split(' ')[1]

  return jwt.verify(token, process.env.ACCES_TOKEN_SECRET)
}


export const isCartPopulated = (arr) => {
  arr.length > 0 ? true : false
}

export const cartItems = arr => arr.length

export const getTotal = (arr) => {
  let n = arr.reduce((a, b) => a + b, 0)
  return n
}