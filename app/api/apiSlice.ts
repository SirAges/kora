import {
    createApi,
    fetchBaseQuery,
    BaseQueryFn
} from "@reduxjs/toolkit/query/react";
import { Action } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";
import type { RootState } from "./store";
import { setCredentials } from "@/redux/auth/authSlice";

function isHydrateAction(action: Action): action is Action<typeof REHYDRATE> & {
    key: string;
    payload: RootState;
} {
    return action.type === REHYDRATE;
}

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL as string;

const baseQuery: BaseQueryFn = async (args, api, extraOptions) => {
    const state = api.getState() as RootState;
    const token = state.auth.token;

    const baseQueryFunction = fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: "include",
        prepareHeaders: headers => {
            if (token) headers.set("authorization", `Bearer ${token}`);
            headers.set("Content-Type", "application/json");
            return headers;
        }
    });

    // Add custom query params for child settings
    const setting = state?.setting;
    const isChild = setting?.child;
    const queryParams = new URLSearchParams({});

    const urlWithParams = (args?.url || args).includes("?")
        ? `${args.url}&${queryParams}`
        : `${args.url}?${queryParams}`;
    // Execute the query
    let result = await baseQueryFunction(
        { ...args, url: urlWithParams },
        api,
        extraOptions
    );
    // Handle token expiration
    if (result?.error?.status === 403) {
        console.log("Access token expired, attempting refresh");

        const refreshResult = await baseQueryFunction(
            { url: "/auth/refresh", method: "POST" },
            api,
            extraOptions
        );

        if (refreshResult?.data) {
            api.dispatch(setCredentials(refreshResult.data.message));
            // Retry the original query with the new token
            result = await baseQueryFunction(
                { ...args, url: urlWithParams },
                api,
                extraOptions
            );
        } else {
            if (refreshResult?.error?.status === 403) {
                console.log("Refresh token expired. Logging out.");
                api.dispatch(setCredentials(null));
            }
            return refreshResult;
        }
    }

    return result;
};

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery,
    tagTypes: ["USERS", "REVIEWS", "CARS", "BOOKINGS"],
    endpoints: builder => ({}),
    extractRehydrationInfo(action, { reducerPath }) {
        if (isHydrateAction(action)) {
            return action.payload ? action.payload[reducerPath] : null;
        }
        return null;
    },
    refetchOnReconnect: true,
    //refetchOnFocus: true,
    refetchOnMountOrArgChange: true
});

//export default apiSlice;
