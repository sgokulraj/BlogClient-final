import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://odd-cyan-chameleon-sock.cyclic.app" }),
    endpoints: (builder) => ({

        signup: builder.mutation({
            query: (user) => ({
                url: "/users/signup",
                method: "POST",
                body: user,

            })
        }),

        login: builder.mutation({
            query: (user) => ({
                url: "/users/login",
                method: "POST",
                body: user,
            })
        }),

        createPost: builder.mutation({
            query: (post) => ({
                url: "/posts",
                method: "POST",
                body: post
            })
        }),

        deletePost: builder.mutation({
            query: ({ postId, userId }) => ({
                url: `/posts/${postId}`,
                method: "DELETE",
                body: { userId }
            })
        }),

        editPost: builder.mutation({
            query: (post) => ({
                url: `/posts/${post.id}`,
                method: "PATCH",
                body: post
            })
        }),

        editUser: builder.mutation({
            query: (user) => ({
                url: `/users/${user.id}`,
                method: "PATCH",
                body: user
            })
        }),

        deleteUser: builder.mutation({
            query: ( userId ) => ({
                url: `/users/${userId}`,
                method: "DELETE",
                body: userId
            })
        })

    })
})

export const { useSignupMutation, useLoginMutation, useCreatePostMutation, useDeletePostMutation, useEditPostMutation, useEditUserMutation, useDeleteUserMutation } = appApi

export default appApi