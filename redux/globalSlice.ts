import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    booking: {
        days: null,
        dropoff_location: {
            title: "dropoff location",
            display_name:
                "Wuse, Municipal Area Council, Federal Capital Territory, Nigeria",
            lat: 9.0620454,
            lng: 7.4665551
        },
        endDate: new Date(),
        startDate: new Date(),
        pickup_location: {
            title: "pickup location",
            display_name:
                "Nyanya, Municipal Area Council, Federal Capital Territory, Nigeria",
            lat: 9.0212556,
            lng: 7.5699144
        }
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
