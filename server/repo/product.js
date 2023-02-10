import { readFileSync } from 'fs';
import {getRatingByProductId} from './rating.js'
import {getAverageOfNumbers} from '../utils/utils.js'



function getScoreByProductId(id){
  const ratings =  getRatingByProductId(id)
  const scores =  ratings.map(rating => rating.score)
  return  getAverageOfNumbers(...scores).toFixed(2)
}


// let products = []
let products = JSON.parse(
  readFileSync(
    new URL('./products.json', import.meta.url)
  )
);

//CRUD Operations

// Read ALL
export const getProducts = () => {
  return products.map(product => {
    product.rating = getScoreByProductId(product.id)
    return product
  })
}

export const getItemsByCategory = (category) => {
  
    return products.filter(getItemsByCategory => getItemsByCategory.category === category)
  
}

export const getCategories = () => {
  return new Set(products.map(product => product.category))
}


//Read by ID
export const getProductById = (id) => {
  const product = products.find((product) => product.id === id)
  product.rating = getScoreByProductId(id)
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