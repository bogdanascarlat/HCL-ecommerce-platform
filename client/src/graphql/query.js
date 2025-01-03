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
`;

export const GET_PROFILE_QUERY = gql`
  query GetProfile {
    getProfile {
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

export const CATEGORIES_QUERY = gql`
  query GetItemsByCategory {
    getCategories
  }
`;

export const ALL_BRANDS_QUERY = gql`
  query AllBrandsQuery {
    getBrands
  }
`;

export const BRANDS_QUERY = gql`
  query GetBrandsByCategory($category: String!) {
    getBrandsByCategory(category: $category) {
      id
      name
    }
  }
`;

export const PRODUCTS_BY_BRANDS_BY_CATEGORY_QUERY = gql`
  query GetAllProductsByBrandsByCategory($category: String!, $brand: String!) {
    getAllProductsByBrandsByCategory(category: $category, brand: $brand) {
      id
      name
      category
      brand
      price
    }
  }
`;

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
      specs {
        productId
        ScreenSize
        ScreenResolution
        DisplayType
        TotalStorageCapacity
        RAMmemory
        OperatingSystem
        ProcessorModel
        WirelessConnectivity
        BluetoothVersion
        FrontFacingCamera
        RearFacingCamera
        Color
        HeadphoneJack
        BuiltInMicrophone
        StylusIncluded
        BatteryLife
        ProductHeight
        ProductWidth
        ProductDepth
        ProductWeight
        Warranty
      }
    }
  }
`;

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
`;

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
`;

export const GET_SHARED_WISHLIST = gql`
  query GetSharedWishlist($userId: ID!) {
    getSharedWishlist(userId: $userId) {
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
`;
