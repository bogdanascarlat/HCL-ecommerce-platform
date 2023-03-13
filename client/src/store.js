import {configureStore} from '@reduxjs/toolkit'

import authReducer from './features/user/authSlice'
import productReducer from './features/products/productSlice'
import messageReducer from './features/message/messageSlice'
import productIdReducer from './features/getProductId/ProductIdSlice'

const store = configureStore({
    reducer:{
        auth: authReducer,
        products: productReducer,
        messages: messageReducer,
        productId: productIdReducer,
    }
})

export default store