import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const currentElement = createSlice({
    name: 'currentPage',
    initialState: {
        page: 'home'
    },
    reducers: {
        changeElement: (state, action: PayloadAction<string>) => {
            state.page = action.payload
        }
    }
})

export const { changeElement } = currentElement.actions
export default currentElement.reducer