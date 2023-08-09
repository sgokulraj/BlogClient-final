import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./PostSlice"
import userSlice from "./UserSlice"
import appApi from "./appApi";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist"
import thunk from "redux-thunk"


const rootReducer = combineReducers({
    user: userSlice,
    posts: postsSlice,
    [appApi.reducerPath]: appApi.reducer
})

const persistConfig = { key: "root", storage, blackList: [appApi.reducerPath, "posts"] };

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, appApi.middleware]
})

export default store

