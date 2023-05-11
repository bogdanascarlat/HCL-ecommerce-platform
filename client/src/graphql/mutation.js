import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Mutation($loginData: LoginData) {
      login(loginData: $loginData) {
      id
      firstName
      lastName
      email
      password
      image
      address
      phone
      birthDate
      wishList
      isActive
      isAdmin
      }
  }`

export const SIGNUP_MUTATION = gql`   
  mutation Mutation1($signupData: SignupData) {
    signup(signupData: $signupData) {
      id
      firstName
      lastName
      email
      password
      image
      address
      phone
      birthDate
      wishList
      cart {
        productId
        quantity
      }
      isActive
      isAdmin
  }
}`

export const  ADD_TO_CART_MUTATION = gql`
mutation Mutation($cartInput: CartInput) {
  addToCart(cartInput: $cartInput) {
    id
    firstName
    lastName
    email
    password
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

export const UPDATE_QUANTITY_MUTATION = gql`
  mutation Mutation($cartInput: CartInput) {
    updateQuantity(cartInput: $cartInput)
  }
`