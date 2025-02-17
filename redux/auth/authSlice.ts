import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    token: null,
    session: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const token = action.payload;
            state.token = token;
        },
        signOut: (state) => {
            state.token = null;
            state.session = null;
        },

        setSession: (state, action) => {
            const session = action.payload;
            state.session = session;
        }
    }
});
export const { signOut, setSession, setCredentials } = authSlice.actions;

export default authSlice.reducer;
export const selectCurrentToken = (state: { auth: { token: string; }; }) => state.auth.token;
export const selectCurrentSession = (state: { auth: { session: any; }; }) => state.auth.session;
