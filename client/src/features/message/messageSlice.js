import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
    name: 'product',
    initialState: {
        errorMessage: null,
        succesMessage: null
    },
    reducers: {
        addErrorMessage: (state, action) => {
            return {
                ...state,
                errorMessage: action.payload
            }
        }
    }
})

export const { addErrorMessage } = messageSlice.actions

export default messageSlice.reducer