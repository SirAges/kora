import { apiSlice } from "@/app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => ({
                url: "/users"
            }),
            providesTags: ["USERS"]
        }),
        getUser: builder.query({
            query: user_id => ({
                url: `/users/${user_id}`
            }),
            providesTags: (result, error, user_id) => [
                { type: "USERS", id: user_id }
            ]
        }),
        updateUser: builder.mutation({
            query: ({ user_id, value }) => ({
                url: `/users/${user_id}`,
                method: "PUT",
                body: value
            }),
            invalidatesTags: (result, error, { user_id }) => [
                { type: "USERS", id: user_id }
            ]
        }),
        deleteUser: builder.mutation({
            query: user_id => ({
                url: `/users/${user_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["USERS"]
        }),
        getStats: builder.query({
            query: () => ({
                url: "/users/stats/all"
            }),
            providesTags: ["STATS"]
        }),
        subscribe: builder.mutation({
            query: user_id => ({
                url: `/users/${user_id}/subscribe`,
                method: "PUT"
            }),
            invalidatesTags: (result, error, user_id) => [
                { type: "USERS", id: user_id }
            ]
        }),
        addDeviceToken: builder.mutation({
            query: ({ user_id, body }) => ({
                url: `/users/${user_id}/add-token`,
                method: "PUT",
                body
            })
        }),
        removeDeviceToken: builder.mutation({
            query: ({ user_id, body }) => ({
                url: `/users/${user_id}/remove-token`,
                method: "PUT",
                body
            })
        }),
        applyDriver: builder.mutation({
            query: ({ user_id, driver_id }) => ({
                url: `/users/${user_id}/apply-driver/${driver_id}`,
                method: "PUT"
            })
        }),
        acceptDriver: builder.mutation({
            query: ({ user_id, driver_id }) => ({
                url: `/users/${user_id}/accept-driver/${driver_id}`,
                method: "PUT"
            })
        }),
        deleteFile: builder.mutation({
            query: ({ user_id, public_id }) => ({
                url: `/users/${user_id}/delete-file/${public_id}`,
                method: "DELETE"
            })
        })
    })
});

export const {
    useGetUsersQuery,
    useGetUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetStatsQuery,
    useSubscribeMutation,
    useAddDeviceTokenMutation,
    useRemoveDeviceTokenMutation,
    useApplyDriverMutation,
    useAcceptDriverMutation,
    useDeleteFileMutation
} = userApiSlice;