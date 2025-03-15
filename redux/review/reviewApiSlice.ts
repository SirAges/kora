import { apiSlice } from "@/app/api/apiSlice";

const reviewApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getReviews: builder.query({
            query: ({ params }) => ({ url: "/reviews", params }),
            providesTags: ["REVIEWS"]
        }),
        createReview: builder.mutation({
            query: body => ({
                url: "/reviews/",
                method: "POST",
                body
            }),
            invalidatesTags: ["REVIEWS"]
        }),
        getReview: builder.query({
            query: review_id => ({ url: `/reviews/${review_id}` }),
            providesTags: (result, error, review_id) => [
                { type: "REVIEWS", id: review_id }
            ]
        }),
        updateReview: builder.mutation({
            query: ({ review_id, user_id, body }) => ({
                url: `/reviews/${review_id}/${user_id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: (result, error, { review_id }) => [
                { type: "REVIEWS", id: review_id }
            ]
        }),
        deleteReview: builder.mutation({
            query: ({ review_id, user_id }) => ({
                url: `/reviews/${review_id}/${user_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["REVIEWS"]
        }),
        getStats: builder.query({
            query: () => ({ url: "/reviews/stats/all" }),
            providesTags: ["REVIEW_STATS"]
        })
    })
});

export const {
    useGetReviewsQuery,
    useCreateReviewMutation,
    useGetReviewQuery,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
    useGetStatsQuery
} = reviewApiSlice;
