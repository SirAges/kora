import { apiSlice } from "@/app/api/apiSlice";

const bookingApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBookings: builder.query({
            query: params => ({ url: "/bookings", params }),
            providesTags: ["BOOKINGS"]
        }),
        getUserBookings: builder.query({
            query: () => ({ url: `/bookings/user` }),
            providesTags: (result, error, user_id) => [
                { type: "BOOKINGS", id: user_id }
            ]
        }),
        createBooking: builder.mutation({
            query: body => ({
                url: "/bookings",
                method: "POST",
                body
            }),
            invalidatesTags: ["BOOKINGS"]
        }),
        getBooking: builder.query({
            query: booking_id => `/bookings/${booking_id}`,
            providesTags: (result, error, booking_id) => [
                { type: "BOOKINGS", id: booking_id }
            ]
        }),
        updateBooking: builder.mutation({
            query: ({ booking_id, user_id, body }) => ({
                url: `/bookings/${booking_id}/${user_id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: (result, error, { booking_id }) => [
                { type: "BOOKINGS", id: booking_id }
            ]
        }),
        deleteBooking: builder.mutation({
            query: ({ booking_id, user_id }) => ({
                url: `/bookings/${booking_id}/${user_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["BOOKINGS"]
        }),
        cancelBooking: builder.mutation({
            query: ({ booking_id, user_id }) => ({
                url: `/bookings/${booking_id}/${user_id}/cancel`,
                method: "PUT"
            }),
            invalidatesTags: (result, error, { booking_id }) => [
                { type: "BOOKINGS", id: booking_id }
            ]
        }),
        getStats: builder.query({
            query: () => "/bookings/stats/all",
            providesTags: ["BOOKING_STATS"]
        }),
        getUserBookingStats: builder.query({
            query: user_id => `/bookings/stats/${user_id}/all`,
            providesTags: (result, error, user_id) => [
                { type: "BOOKING_STATS", id: user_id }
            ]
        })
    })
});

export const {
    useGetBookingsQuery,
    useGetUserBookingsQuery,
    useCreateBookingMutation,
    useGetBookingQuery,
    useUpdateBookingMutation,
    useDeleteBookingMutation,
    useCancelBookingMutation,
    useGetStatsQuery,
    useGetUserBookingStatsQuery
} = bookingApiSlice;
