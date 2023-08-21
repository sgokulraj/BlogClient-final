import {createSlice} from "@reduxjs/toolkit"
import appApi from "./appApi"


const initialState = null;
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLogout: ()=> initialState,
    },
    extraReducers: (builder)=>{
        builder.addMatcher(appApi.endpoints.login.matchFulfilled, (state, action)=>action.payload)
        builder.addMatcher(appApi.endpoints.editUser.matchFulfilled, (state, action)=>action.payload)
    }

})

const {actions, reducer} = userSlice;
export const {setLogout} = actions
export default reducer