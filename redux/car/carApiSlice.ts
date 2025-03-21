import { apiSlice } from "@/app/api/apiSlice";

const carApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCars: builder.query({
            query: (params) => ({ url: "/cars",params }),
            providesTags: ["CARS"]
        }),
        getUserCars: builder.query({
            query: user_id => `/cars/user/${user_id}`,
            providesTags: (result, error, user_id) => [
                { type: "CARS", id: user_id }
            ]
        }),
        createCar: builder.mutation({
            query: value => ({
                url: "/cars",
                method: "POST",
                body: value
            }),
            invalidatesTags: ["CARS"]
        }),
        getCar: builder.query({
            query: car_id => ({url:`/cars/${car_id}`,}),
            providesTags: (result, error, car_id) => [
                { type: "CARS", id: car_id }
            ]
        }),
        updateCar: builder.mutation({
            query: ({ car_id, user_id, body }) => ({
                url: `/cars/${car_id}/${user_id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: (result, error, { car_id }) => [
                { type: "CARS", id: car_id }
            ]
        }),
        deleteCar: builder.mutation({
            query: ({ car_id, user_id }) => ({
                url: `/cars/${car_id}/${user_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["CARS"]
        }),
        getStats: builder.query({
            query: () => "/cars/stats/all",
            providesTags: ["CARS"]
        }),
        getUserCarStats: builder.query({
            query: user_id => `/cars/stats/${user_id}/all`,
            providesTags: (result, error, user_id) => [
                { type: "CARS", id: user_id }
            ]
        })
    })
});

export const {
    useGetCarsQuery,
    useGetUserCarsQuery,
    useCreateCarMutation,
    useGetCarQuery,
    useUpdateCarMutation,
    useDeleteCarMutation,
    useGetStatsQuery,
    useGetUserCarStatsQuery
} = carApiSlice;
