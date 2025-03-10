import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    token: null,
    email: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const token = action.payload;
            state.token = token;
        },
        setEmail: (state, action) => {
            const email = action.payload;
            state.email = email;
        }
    }
});
export const { setCredentials, setEmail } = authSlice.actions;

export default authSlice.reducer;
export const selectCurrentToken = (state: { auth: { token: string } }) =>
    state.auth.token;
export const selectCurrentEmail = (state: { auth: { email: string } }) =>
    state.auth.email;
