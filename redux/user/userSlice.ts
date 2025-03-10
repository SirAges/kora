import { createSlice } from "@reduxjs/toolkit";
const initialState = { darkmode: false };
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setDarkMode: (state, action) => {
            state.darkmode = action.payload;
        }
    }
});
export const {setDarkMode} = userSlice.actions;
export default userSlice.reducer;
export const selectCurrentDarkmode=(state)=>state.user.darkmode