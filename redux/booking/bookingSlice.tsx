import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    booking: {}
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        addToBooking: (state, action) => {
            const itemToAdd = action.payload;
            state.booking = { ...state.booking, ...itemToAdd };
        }
    }
});
export const { addToBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
export const selectCurrentBooking = (state: { booking: { token: string } }) =>
    state.booking.booking;
