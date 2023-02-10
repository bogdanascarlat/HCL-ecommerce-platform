import {  getItemsByCategory, getProducts, getCategories } from '../repo/product.js'
import { getProductById } from '../repo/product.js'
import {decodeJWT} from '../utils/utils.js'



export const getAllProducts = (filter, authHeader) => {
    decodeJWT(authHeader)
    let products = getProducts()

    if(!filter){
        return products   
    }

    const { inStock, byBrand, hasDiscount, byCategory, priceRange} = filter

    if(inStock){
        products = products.filter(product => product.stock > 0)
    }

    if(byBrand){
        products = products.filter(product => product.brand === byBrand)
    }

    if(byCategory){
        products = products.filter(product => product.category === byCategory)
    }

    if(priceRange && priceRange.length === 2){
        products = products.filter(product => product.price > priceRange[0] && product.price < priceRange[1])
    }
    
    return products
}

export const getProductWithId = (productId, authHeader) => {
    decodeJWT(authHeader)
    return getProductById(productId)
}

export const getAllProductsByCategory = (category, authHeader) => {
    decodeJWT(authHeader)
    console.log(category)
    return getItemsByCategory(category)
}

export const getAllCategories = (authHeader) => {
    decodeJWT(authHeader)
    return getCategories()
}

export const searchProductByKeyword = (keyword, authHeader) => getProducts().filter((product) => product.title.includes(keyword))