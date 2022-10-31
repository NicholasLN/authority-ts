import { createSlice } from "@reduxjs/toolkit"

export const currentPageSlice = createSlice({
    name: 'currentPage',
    initialState: {
        page: 'home'
    },
    reducers: {
        changePage: (state, action) => {
            state.page = action.payload
        }
    }
})

export const { changePage } = currentPageSlice.actions
export default currentPageSlice.reducer