import { readFileSync } from "fs"

let ratings = JSON.parse(
  readFileSync(new URL("./ratings.json", import.meta.url))
)

//CRUD Operations

// Read ALL
export const getRatings = () => ratings

//Read by ID
export const getRatingById = (id) => ratings.find((rating) => rating.id === id)
export const getRatingByProductId = (productId) =>
  ratings.filter((rating) => rating.productId == productId)
export const getRatingsByUserId = (userId) =>
  ratings.filter((rating) => rating.userId == userId)

// Create new product
export const createNewRating = (productId, userId, score) => {
  ratings.push({
    id: ratings.length + 1,
    productId,
    userId,
    score,
  })
}


// Update product with ID
export const updateRatingById = (id, score) => {
    const rating = ratings.find(rating => rating.id === id)
    rating.score = score
    return rating
}

// export const updateRating = (productId, userId, newScore) => {
//   for (let n = 0; n < ratings.length; ++n) {
//     if (ratings[n].productId == productId && ratings[n].userId == userId) {
//       ratings[n].score = newScore
//       return true
//     }
//   }
//   return false
// }