import { createSlice } from "@reduxjs/toolkit";
import appApi from "./appApi";


const initialState = []
export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts: (_, action) => {
            return action.payload.data
        }, 
        setPost: (_, action) => {
            console.log(state.posts)
            const updatedPosts = state.posts?.map((post) => {
              if (post._id === action.payload.posts._id) {
                return action.payload.posts;
              }
              return post;
            });
            console.log(updatedPosts)
            state.posts = updatedPosts;
          },
        setEmpty: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addMatcher(appApi.endpoints.createPost.matchFulfilled, (state, action) => action.payload)
        builder.addMatcher(appApi.endpoints.deletePost.matchFulfilled, (state, action) => action.payload)
        builder.addMatcher(appApi.endpoints.editPost.matchFulfilled, (state, action) => action.payload)
        builder.addMatcher(appApi.endpoints.updateLikes.matchFulfilled, (state, action) => action.payload)
        builder.addMatcher(appApi.endpoints.updateComments.matchFulfilled, (state, action) => action.payload)
        



    }
})



const { actions, reducer } = postsSlice;
export const { setPosts, setEmpty, setPost } = actions;
export default reducer
