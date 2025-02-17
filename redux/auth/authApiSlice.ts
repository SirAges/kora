import { apiSlice } from "@/app/api/apiSlice";

import { signOut, setCredentials } from "./authSlice";
import { setPersist } from "../setting/settingSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: value => ({
                url: "/dive/auth/login",
                method: "POST",
                body: value
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    if (data && data !== undefined) {
                        dispatch(setCredentials(data.message));
                    }
                } catch (err) {}
            }
        }),
        register: builder.mutation({
            query: value => ({
                url: "/dive/auth/register",
                method: "POST",
                body: value
            })
        }),
        resetPassword: builder.mutation({
            query: value => ({
                url: "/dive/auth/resetpassword",
                method: "PATCH",
                body: value
            })
        }),
        verifyEmail: builder.mutation({
            query: value => ({
                url: "/dive/auth/verifyemail",
                method: "POST",
                body: value
            })
        }),

        logout: builder.mutation({
            query: () => ({
                url: "/dive/auth/logout",
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
                url: "/dive/auth/refresh",
                method: "POST"
            }),
            async onQueryStarted(arg,{ dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials(data.message));
                } catch (err) {}
            }
        })
    })
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useRefreshMutation,
    useResetPasswordMutation,
    useVerifyEmailMutation
} = authApiSlice;
