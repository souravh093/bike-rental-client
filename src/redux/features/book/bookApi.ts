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
    updateWithPayment: builder.mutation({
      query: ({ id, amount }) => {
        return {
          url: `/rentals/pay/${id}`,
          method: "PUT",
          body: { amount },
        };
      },
      invalidatesTags: ["Rental"],
    }),
    returnCalculation: builder.mutation({
      query: (id) => {
        return {
          url: `/rentals/${id}/return`,
          method: "PUT",
        };
      },
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

    getInitialBooking: builder.query({
      query: () => {
        return {
          url: `/rentals/initial-paid`,
          method: "GET",
        };
      },
      providesTags: ["Rental"],
    }),
  }),
});

export const {
  useCreateRentalMutation,
  useGetRentalsQuery,
  useUpdateWithPaymentMutation,
  useGetInitialBookingQuery,
  useReturnCalculationMutation,
} = bookApi;
