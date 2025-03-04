import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    token:null
   };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const token = action.payload;
            state.token = token;
        }
    }
});
export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
export const selectCurrentToken = (state: { auth: { token: string } }) =>
    state.auth.token;
