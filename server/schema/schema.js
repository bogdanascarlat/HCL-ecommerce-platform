import {
  getAllProductsByCategory,
  getAllProductsByBrands, // import getAllProductsByBrands function
  getAllProducts,
  getProductWithId,
  getAllCategories,
  getAllBrands,
  getAllBrandsByCategory,
  getAllProductsByBrandsByCategory,
  searchProductByKeyword,
} from "../resolvers/product.js";
import {
  login,
  signup,
  getProfile,
  addProductToCart,
  addProductToWishList,
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
    byCategoryKeyword: String
    byDescriptionKeyword: String
    byKeyword: String
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
    specs: [Specifications]!
  }
  type Category {
    category: String!
    brands: [Brand!]!
  }
  type Brand {
    id: ID!
    name: String
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
  type Specifications {
    productId: ID!
    ScreenSize: Float!
    ScreenResolution: [Int!]!
    DisplayType: String!
    TotalStorageCapacity: Int!
    OperatingSystem: String!
    ProcessorModel: String!
    RAMmemory: Int!
    WirelessConnectivity: [String!]
    HeadphoneJack: String!
    BatteryLife: Int!
    FrontFacingCamera: Int!
    RearFacingCamera: Int!
    BuiltInMicrophone: String!
    ProductHeight: Float
    ProductWidth: Float
    ProductDepth: Float
    ProductWeight: Float
    StylusIncluded: String!
    Warranty: Int!
    BluetoothVersion: Float!
    Color: String!
  }
  type Query {
    getAllProducts(filter: Filter): [Product]
    getProduct(id: ID!): Product
    getProfile: User
    getAllUsers: [User]
    getItemsByCategory(category: String!): [Product]
    getCategories: [String!]
    getItemsByBrands(brand: String!): [Product]
    getBrands: [String!]
    getProductsByBrands(brand: String!): [Product]
    getBrandsByCategory(category: String!): [Brand!]
    getProductsByBrandsByCategory(category: String!, brand: String!): [Product]
    getAllProductsByBrandsByCategory(
      category: String!
      brand: String!
    ): [Product]
    searchByKeyword(keyword: String!): [Product]
    getProductsCart: [CartProductType]
    getProductsWishlist: [Product]
  }
  type Mutation {
    login(loginData: LoginData): User
    signup(signupData: SignupData): User
    addToCart(cartInput: CartInput): User
    updateQuantity(cartInput: CartInput): Boolean
    addToWishList(productId: ID): User
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
    getItemsByBrands: (_, args, context) =>
      getAllProductsByBrands(args.brand, context.authHeader),
    getBrands: (_, args, context) => getAllBrands(context.authHeader),
    getBrandsByCategory: (_, args, context) =>
      getAllBrandsByCategory(args.category, context.authHeader),
    getProductsByBrands: (_, args, context) =>
      getAllProductsByBrandsByCategory(
        null,
        args.brand, // pass brand parameter to getAllProductsByBrandsByCategory
        context.authHeader
      ),
    getProductsByBrandsByCategory: (_, args, context) =>
      getAllProductsByBrandsByCategory(
        args.category,
        args.brand,
        context.authHeader
      ),
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
    addToWishList: (_, args, context) =>
      addProductToWishList(args.productId, context.authHeader),
  },
};
