import { baseApi } from "@/redux/api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBikes: builder.query({
      query: () => ({
        url: "/bikes",
        method: "GET",
      }),
      providesTags: ["Bike"],
    }),
  }),
});

export const { useGetBikesQuery } = bikeApi;
