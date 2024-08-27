import { baseApi } from "@/redux/api/baseApi";

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRental: builder.mutation({
      query: (data) => ({
        url: `/rentals`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Rental"],
    }),
    getRentals: builder.query({
      query: (query) => {
        const params = new URLSearchParams();

        if (query) {
          params.append(query.name, query.value);
        }
        return {
          url: `/rentals`,
          method: "GET",
          params,
        };
      },
      providesTags: ["Rental"],
    }),
  }),
});

export const { useCreateRentalMutation, useGetRentalsQuery } = bookApi;
