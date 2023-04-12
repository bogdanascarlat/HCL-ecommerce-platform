import { readFileSync } from 'fs';
import {getRatingByProductId} from './rating.js'
import {getAverageOfNumbers} from '../utils/utils.js'
import { specs } from './specs.js';
import productsData from "../repo/products.json" assert { type: "json" };

function getScoreByProductId(id){
  const ratings =  getRatingByProductId(id)
  const scores =  ratings.map(rating => rating.score)
  return  getAverageOfNumbers(...scores).toFixed(2)
}

// let products = []
let products = JSON.parse(
  readFileSync(new URL("./products.json", import.meta.url))
);

// Get specs by product ID
const getSpecsByProductId = (id) => {
  return specs.filter(spec => spec.productId === id);
}

//CRUD Operations

// Read ALL
export const getProducts = () => {
  return products.map(product => {
    product.rating = getScoreByProductId(product.id);
    product.specs = getSpecsByProductId(product.id);
    return product;
  })
}

export const getItemsByCategory = (category) => {
  
    return products.filter(getItemsByCategory => getItemsByCategory.category === category)
  
}

export const getCategories = () => {
  return new Set(products.map((product) => product.category));
};

//only return products that match the selected category and brand respectively


export const getItemsByBrands = (brand) => {
  return products.filter((product) => product.brand === brand);
};

export const getBrandsByCategory = (category) => {
  const brands = [];
  getProducts().forEach((product) => {
    if (product.category === category) {
      const brand = product.brand;
      if (!brands.some((b) => b.name === brand)) {
        brands.push({ id: brands.length + 1, name: brand });
      }
    }
  });
  return brands;
};

/////////////////////

export const getBrands = () => {
  return new Set(products.map((product) => product.brand));
};

export const getProductsByBrands = (brand) => {
  return new Set(
    products.filter(
      (product) => product.brand.toLowerCase() === brand.toLowerCase()
    )
  );
};

//Read by ID
export const getProductById = (id) => {
  const product = products.find((product) => product.id === id)
  product.rating = getScoreByProductId(id)
  product.specs = getSpecsByProductId(id);
  return product
}

// Create new product
export const createNewProduct = (product) => {
  const newProduct = {
    id: products.length + 1,
    ...product,
  };
  products.push(newProduct);
};

// Update product with ID
export const updateProductById = (id, product) => {
  let productToBeUpdated = products.find((product) => product.id === id);
  productToBeUpdated = { id, ...product };

  const newProducts = products.map((product) => {
    if (product.id === id) {
      return productToBeUpdated;
    } else {
      return product;
    }
  });

  products = newProducts;
};

// Delete By ID
export const deleteProductById = (id) => {
  const remainedProducts = products.filter((product) => product.id !== id);
  products = remainedProducts;
};

export const getProductsByBrandsByCategory = () => {
  const brandsByCategory = {};

  for (const product of productsData) {
    const { category: prodCategory, brand: prodBrand } = product;

    if (category && prodCategory !== category) {
      continue;
    }

    if (brand && prodBrand !== brand) {
      continue;
    }

    if (!(prodCategory in brandsByCategory)) {
      brandsByCategory[prodCategory] = {};
    }

    if (!(prodBrand in brandsByCategory[prodCategory])) {
      brandsByCategory[prodCategory][prodBrand] = [];
    }

    brandsByCategory[prodCategory][prodBrand].push(product);
  }

  return brandsByCategory;
};
