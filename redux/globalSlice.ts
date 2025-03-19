import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    booking: {
       
        tax:12
    }
};

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        addToBooking: (state, action) => {
            Object.keys(action.payload).forEach(key => {
                state.booking[key] = action.payload[key];
            });
        }
    }
});

export const { addToBooking } = globalSlice.actions;
export default globalSlice.reducer;
export const selectCurrentBooking = state => state.global.booking;
