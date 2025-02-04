import { createSlice } from "@reduxjs/toolkit"

const UserSlices = createSlice({
    name: "User",
    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || {}
    },
    reducers: {
        getuser: (state, action) => {
            state.user = action.payload
            localStorage.setItem("user", JSON.stringify(action.payload))
        },
        removeuser: (state) => {
            state.user = {}
            localStorage.removeItem("user")
        }
    }
})

export const { getuser, removeuser } = UserSlices.actions
export default UserSlices.reducer