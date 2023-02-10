import { gql } from "@apollo/client";

export const PROFILE_QUERY = gql`
    query ExampleQuery {
        getProfile {
        id
        firstName
        lastName
        email
        image
        address
        phone
        birthDate
        wishList
        isActive
        isAdmin
        cart {
            productId
            quantity
          }
        }
    }
`

export const CATEGORIES_QUERY = gql`
    query GetItemsByCategory {
        getCategories
    }
`

export const GET_ITEMS = gql`
query GetAllProducts($filter: Filter) {
    getAllProducts(filter: $filter) {
      id
      title
      description
      price
      stock
      brand
      category
      discountPercentage
      rating
      thumbnail
      images
    }
  }
`

export const GET_PRODUCTS_CART = gql`
query Query {
  getProductsCart {
    quantity
    product {
      id
      title
      description
      price
      stock
      brand
      category
      discountPercentage
      rating
      thumbnail
      images
    }
  }
}
`

export const GET_PRODUCTS_WISHLIST = gql`
    query Query {
      getProductsWishlist {
        id
        title
        description
        price
        stock
        brand
        category
        discountPercentage
        rating
        thumbnail
        images
      }
    }
`