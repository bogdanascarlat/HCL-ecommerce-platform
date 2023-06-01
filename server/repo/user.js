import { readFileSync, writeFileSync } from "fs";
import { hash } from "bcrypt";
import { BCRYPT_SALT } from "../resolvers/user.js";

let users = JSON.parse(readFileSync(new URL("./users.json", import.meta.url)));

//CRUD Operations

// Read ALL
export const getAllUsers = () => users;

//Read by ID
export const getUserById = (id) => users.find((user) => user.id === id);

//Read by email
export const getUserByEmail = (email) =>
  users.find((user) => user.email === email);

// Create new user
export const createNewUser = async (user) => {
  const newUser = {
    id: users.length + 1,
    firstName: "Enter your first name",
    lastName: "Enter your last name",
    address: "Enter your address",
    phone: "Enter your phone number",
    birthDate: "Enter your birth date",
    wishList: [],
    giftList: [],
    cart: [],
    ratings: [],
    isActive: true,
    isAdmin: false,
    ...user,
    image: process.env.DEFAULT_IMAGE_ADDRESS,
    password: await hash(user.password, BCRYPT_SALT),
  };

  users.push(newUser);

  writeFileSync(
    new URL("./users.json", import.meta.url),
    JSON.stringify(users, null, 2)
  );

  return newUser;
};

// Update user with ID
export const updateUserById = (id, user) => {
  let userToBeUpdated = users.find((user) => user.id === id);
  userToBeUpdated = { id, ...user };

  const newUsers = users.map((user) => {
    if (user.id === id) {
      return userToBeUpdated;
    } else {
      return user;
    }
  });

  users = newUsers;
  return users.find((user) => user.id === id);
};

// Delete By ID
export const deleteUserById = (id) => {
  const remainedUsers = users.filter((user) => user.id !== id);
  users = remainedUsers;
};
