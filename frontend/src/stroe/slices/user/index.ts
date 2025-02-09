import { createSlice } from "@reduxjs/toolkit"

type User = {
    _id: string,
    email: string,
    image: string
    ispremiumuser: boolean,
    totalexpenses: number,
    name: string
}

type Userinitaltypes = {
    user: User | null
}

const UserSlices = createSlice({
    name: "User",
    initialState: {
        user: JSON.parse(localStorage.getItem("user") || "null") || null
    } as Userinitaltypes,
    reducers: {
        getuser: (state, action) => {
            state.user = action.payload
            localStorage.setItem("user", JSON.stringify(action.payload))
        },
        removeuser: (state) => {
            state.user = null
            localStorage.removeItem("user")
        },
        makeuserPremuin: (state) => {
            if (state.user) {
                state.user.ispremiumuser = true
                localStorage.removeItem("user")
                localStorage.setItem("user", JSON.stringify(state.user))
            }
        }
    }
})

export const { getuser, removeuser, makeuserPremuin } = UserSlices.actions
export default UserSlices.reducer