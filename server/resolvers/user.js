import {
  getUserByEmail,
  getUserById,
  createNewUser,
  updateUserById,
} from "../repo/user.js";
import { genSalt, compare, hash } from "bcrypt";
import { cartItems, decodeJWT } from "../utils/utils.js";
import jwt from "jsonwebtoken";
import { getProductById } from "../repo/product.js";

export const BCRYPT_SALT = await genSalt(10);

//AUTH
export const login = async ({ email, password }, res) => {
  const user = getUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordCorrect = await compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("Password is incorrect");
  }
  const toBeEncoded = user; // Modify with what to be eoncoded
  res.cookie(
    "token",
    jwt.sign(toBeEncoded, process.env.ACCES_TOKEN_SECRET, {
      expiresIn: 60 * 20,
    })
  );
  return user;
};

export const signup = async (signupData) => {
  const user = getUserByEmail(signupData.email);
  if (user) {
    throw new Error("Email is taken");
  }
  const newUser = await createNewUser(signupData);
  return newUser;
};
//

//We know that in token it's hidden the profile
export const getProfile = (authHeader) => {
  const { id } = decodeJWT(authHeader);
  return getUserById(id);
};

//
export const addProductToCart = (cartInput, authHeader) => {
  const { id } = decodeJWT(authHeader);
  const user = getUserById(id);
  user.cart.push(cartInput);
  return updateUserById(id, user);
};

export const addProductToWishList = (productID, authHeader) => {
  console.log("In user Product ID", productID);

  const { id } = decodeJWT(authHeader);
  const user = getUserById(id);

  if (!user.wishList.includes(productID)) {
    user.wishList.push(productID);
    updateUserById(id, user);
  }
  return user;
};

export const removeProductFromWishList = (productId, authHeader) => {
  const { id } = decodeJWT(authHeader);
  const user = getUserById(id);
  user.wishList = user.wishList.filter((itemId) => itemId !== productId);
  return updateUserById(id, user);
};

export const getProductsWishlist = async (authHeader) => {
  const { id } = decodeJWT(authHeader);
  const user = getUserById(id);
  const { wishList } = user;

  return wishList.map((id) => getProductById(Number.parseInt(id)));
};

export const addProductToGiftList = (productID, authHeader) => {
  console.log("In user Product ID", productID);

  const { id } = decodeJWT(authHeader);
  const user = getUserById(id);

  if (!user.giftList.includes(productID)) {
    user.giftList.push(productID);
    updateUserById(id, user);
  }
  return user;
};

export const removeProductFromGiftList = (productId, authHeader) => {
  const { id } = decodeJWT(authHeader);
  const user = getUserById(id);
  user.giftList = user.giftList.filter((itemId) => itemId !== productId);
  return updateUserById(id, user);
};

export const getProductsGiftlist = async (authHeader) => {
  const { id } = decodeJWT(authHeader);
  const user = getUserById(id);
  const { giftList } = user;

  return giftList.map((id) => getProductById(Number.parseInt(id)));
};

export const getSharedWishlist = async () => {
  const users = getAllUsers(); // retrieve all users
  const sharedWishlist = users.reduce((acc, user) => {
    return [...acc, ...user.sharedWishList]; // add all items from all users' shared wishlists to the accumulator
  }, []);
  return sharedWishlist.map((id) => getProductById(Number.parseInt(id))); // retrieve the products based on their ids
};

export const getProductsCart = async (authHeader) => {
  const { id } = decodeJWT(authHeader);
  const user = getUserById(id);
  const { cart } = user;

  return cart.map((cartItem) => {
    return {
      product: getProductById(Number.parseInt(cartItem.productId)),
      quantity: cartItem.quantity,
    };
  });
};

export const updateQuantity = (cartInput, authHeader) => {
  const { id } = decodeJWT(authHeader);
  const user = getUserById(id);
  const indexToModify = user.cart.findIndex(
    (cartItem) => cartItem.productId === cartInput.productId
  );
  if (indexToModify === -1) {
    return false;
  }
  if (cartInput.quantity > 0) {
    //Update content
    user.cart[indexToModify] = cartInput;
  } else {
    //Remove content
    user.cart = user.cart.filter(
      (cartItem) => cartItem.productId !== cartInput.productId
    );
  }
  updateUserById(id, user);
  return true;
};
