import {
  getItemsByCategory,
  getProducts,
  getCategories,
  getItemsByBrands,
  getBrands,
  getProductsByBrands,
} from "../repo/product.js";
import { getProductById } from "../repo/product.js";
import { decodeJWT } from "../utils/utils.js";

export const getAllProducts = (filter, authHeader) => {
  decodeJWT(authHeader);
  let products = getProducts();

  if (!filter) {
    return products;
  }

  const {
    inStock,
    byBrand,
    hasDiscount,
    byCategory,
    priceRange,
    byTitle,
    byCategoryKeyword,
    byKeyword,
    byDescriptionKeyword,
  } = filter;

  if (inStock) {
    products = products.filter((product) => product.stock > 0);
  }

  if (byBrand) {
    products = products.filter((product) => product.brand === byBrand);
  }

  if (byCategory) {
    products = products.filter((product) => product.category === byCategory);
  }

  if (priceRange && priceRange.length === 2) {
    products = products.filter(
      (product) =>
        product.price > priceRange[0] && product.price < priceRange[1]
    );
  }

  if (byTitle || byCategoryKeyword || byDescriptionKeyword || byKeyword) {
    products = products.filter(
      (product) =>
        (byTitle &&
          product.title.toLowerCase().includes(byTitle.toLowerCase())) ||
        (byCategoryKeyword &&
          product.category
            .toLowerCase()
            .includes(byCategoryKeyword.toLowerCase())) ||
        (byDescriptionKeyword &&
          product.description
            .toLowerCase()
            .includes(byDescriptionKeyword.toLowerCase())) ||
        (byKeyword &&
          product.keywords.toLowerCase().includes(byKeyword.toLowerCase()))
    );
  }

  return products;
};

export const getProductWithId = (productId, authHeader) => {
  decodeJWT(authHeader);
  return getProductById(productId);
};

export const getAllProductsByCategory = (category, authHeader) => {
  decodeJWT(authHeader);
  return getItemsByCategory(category);
};

export const getAllCategories = (authHeader) => {
  decodeJWT(authHeader);
  return getCategories();
};

export const getAllBrands = (authHeader) => {
  decodeJWT(authHeader);
  return getBrands();
};

export const getAllProductsByBrands = (brand, authHeader) => {
  decodeJWT(authHeader);
  return getProductsByBrands(brand);
};

export const searchProductByKeyword = (keyword, authHeader) =>
  getProducts().filter((product) => product.title.includes(keyword));
