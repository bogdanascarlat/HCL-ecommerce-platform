import {
  getAllProductsByCategory,
  getAllProducts,
  getProductWithId,
  getAllCategories,
  searchProductByKeyword,
} from "../resolvers/product.js";
import {
  login,
  signup,
  getProfile,
  addProductToCart,
  updateQuantity,
  getProductsCart,
  getProductsWishlist,
} from "../resolvers/user.js";
import { getAllUsers } from "../repo/user.js";

export const typeDefs = /* GraphQL */ `
  input LoginData {
    email: String
    password: String
  }
  input SignupData {
    email: String!
    password: String!
    firstName: String
    lastName: String
    address: String
    phone: String
    birthDate: String
  }
  input CartInput {
    productId: ID
    quantity: Int
  }

  input Filter {
    inStock: Boolean
    byBrand: String
    byCategory: String
    byTitle: String
    priceRange: [Float]
  }

  type Product {
    id: ID!
    title: String!
    description: String!
    price: Float!
    stock: Int!
    brand: String!
    category: String!
    discountPercentage: Float!
    rating: Float!
    thumbnail: String!
    images: [String!]!
  }
  type CartType {
    productId: ID!
    quantity: Int
  }
  type CartProductType {
    product: Product
    quantity: Int
  }
  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String!
    password: String!
    image: String
    address: String
    phone: String
    birthDate: String
    wishList: [ID!]
    cart: [CartType]
    isActive: Boolean!
    isAdmin: Boolean!
  }
  type Query {
    getAllProducts(filter: Filter): [Product]
    getProduct(id: ID!): Product
    getProfile: User
    getAllUsers: [User]
    getItemsByCategory(category: String!): [Product]
    getCategories: [String!]
    searchByKeyword(keyword: String!): [Product]
    getProductsCart: [CartProductType]
    getProductsWishlist: [Product]
  }
  type Mutation {
    login(loginData: LoginData): User
    signup(signupData: SignupData): User
    addToCart(cartInput: CartInput): User
    updateQuantity(cartInput: CartInput): Boolean
  }
`;

export const resolvers = {
  Query: {
    getAllUsers: (_args, context) => getAllUsers(context.authHeader),
    getAllProducts: (_, args, context) =>
      getAllProducts(args.filter, context.authHeader),
    getProduct: (_, args, context) =>
      getProductWithId(parseInt(args.id), context.authHeader),
    getProfile: (_, args, context) => getProfile(context.authHeader),
    getItemsByCategory: (_, args, context) =>
      getAllProductsByCategory(args.category, context.authHeader),
    getCategories: (_, args, context) => getAllCategories(context.authHeader),
    searchByKeyword: (_, args, context) =>
      searchProductByKeyword(args.keyword, context.authHeader),
    getProductsCart: (_, args, context) => getProductsCart(context.authHeader),
    getProductsWishlist: (_, args, context) =>
      getProductsWishlist(context.authHeader),
  },
  Mutation: {
    login: (_, args, context) => login(args.loginData, context.res),
    signup: (_, args, context) => signup(args.signupData),
    addToCart: (_, args, context) =>
      addProductToCart(args.cartInput, context.authHeader),
    updateQuantity: (_, args, context) =>
      updateQuantity(args.cartInput, context.authHeader),
  },
};
