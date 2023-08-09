import { createSlice } from "@reduxjs/toolkit";
import appApi from "./appApi";



export const postsSlice = createSlice({
    name: "posts",
    initialState: [],
    reducers:{
        setPosts: (_,action)=>{
            return action.payload.data
        }
    },
    extraReducers: (builder)=>{
        builder.addMatcher(appApi.endpoints.createPost.matchFulfilled, (state, action)=> action.payload)
        builder.addMatcher(appApi.endpoints.deletePost.matchFulfilled, (state, action)=> action.payload)
        builder.addMatcher(appApi.endpoints.editPost.matchFulfilled, (state, action)=> action.payload)


    }
})



const {actions , reducer} = postsSlice;
export const {setPosts} = actions;
export default reducer