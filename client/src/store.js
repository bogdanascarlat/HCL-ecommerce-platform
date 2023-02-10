import {configureStore} from '@reduxjs/toolkit'

import authReducer from './features/user/authSlice'
import productReducer from './features/products/productSlice'
import messageReducer from './features/message/messageSlice'

const store = configureStore({
    reducer:{
        auth: authReducer,
        products: productReducer,
        messages: messageReducer
    }
})

export default store