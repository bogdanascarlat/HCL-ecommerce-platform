import { gql } from '@apollo/client';

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
  }
`;

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
  }
`;

export const ADD_TO_CART_MUTATION = gql`
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
`;

export const ADD_TO_WISHLIST_MUTATION = gql`
  mutation Mutation($productId: ID!) {
    addToWishList(productId: $productId) {
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
`;

export const REMOVE_FROM_WISHLIST_MUTATION = gql`
  mutation RemoveFromWishlistMutation($productId: ID!) {
    removeFromWishList(productId: $productId) {
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
`;

export const UPDATE_QUANTITY_MUTATION = gql`
  mutation Mutation($cartInput: CartInput) {
    updateQuantity(cartInput: $cartInput)
  }
`;

export const ADD_TO_GIFTLIST_MUTATION = gql`
  mutation Mutation($productId: ID!) {
    addToGiftList(productId: $productId) {
      id
      firstName
      lastName
      email
      password
      image
      address
      phone
      birthDate
      giftList
      isActive
      isAdmin
      cart {
        productId
        quantity
      }
    }
  }
`;

export const REMOVE_FROM_GIFTLIST_MUTATION = gql`
  mutation RemoveFromGiftlistMutation($productId: ID!) {
    removeFromGiftList(productId: $productId) {
      id
      firstName
      lastName
      email
      password
      image
      address
      phone
      birthDate
      giftList
      isActive
      isAdmin
      cart {
        productId
        quantity
      }
    }
  }
`;

export const UPDATE_PROFILE_IMAGE_MUTATION = gql`
  mutation UpdateProfileImage($id: ID!, $image: Upload!) {
    updateProfileImage(id: $id, image: $image) {
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
`;


export const UPDATE_ADDRESS_MUTATION = gql`
  mutation UpdateAddress($updateAddressInput: UpdateAddressInput) {
    updateAddress(updateAddressInput: $updateAddressInput) {
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
`;