import { apiSlice } from "@/app/api/apiSlice";

import { setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signin: builder.mutation({
            query: value => ({
                url: "/auth/sign-in",
                method: "POST",
                body: value
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    if (data && data !== undefined) {
                        dispatch(setCredentials(data?.data));
                    }
                } catch (err) {}
            }
        }),
        signup: builder.mutation({
            query: value => ({
                url: "/auth/sign-up",
                method: "POST",
                body: value
            })
        }),
        resetPassword: builder.mutation({
            query: value => ({
                url: "/auth/reset-password",
                method: "PATCH",
                body: value
            })
        }),
        verify: builder.mutation({
            query: value => ({
                url: "/auth/verify",
                method: "POST",
                body: value
            })
        }),

        signout: builder.mutation({
            query: () => ({
                url: "/auth/sign-out",
                method: "POST"
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    if (data && data !== undefined) {
                        dispatch(signOut());
                        dispatch(setPersist("auth"));
                    }
                } catch (err) {}
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: "/auth/refresh",
                method: "POST"
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials(data.message));
                } catch (err) {}
            }
        })
    })
});

export const {
    useSigninMutation,
    useSignupMutation,
    useSignoutMutation,
    useRefreshMutation,
    useResetPasswordMutation,
    useVerifyMutation
} = authApiSlice;
