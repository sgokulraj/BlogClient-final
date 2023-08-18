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
                url: `/users/${user.userId}`,
                method: "PATCH",
                body: user
            })
        }),

        updateLikes: builder.mutation({
            query: ({postId, userId}) => ({
                url: `/posts/${postId}/likes`,
                method: "PATCH",
                body: {userId}
            })
        }),

        updateComments: builder.mutation({
            query:(post) => ({
                url: `posts/${post.postId}/comments`,
                method:"PATCH",
                body: post
            })
        })

        

    })
})

export const { useSignupMutation, useLoginMutation, useCreatePostMutation, useDeletePostMutation, useEditPostMutation, useEditUserMutation, useUpdateLikesMutation, useUpdateCommentsMutation } = appApi

export default appApi