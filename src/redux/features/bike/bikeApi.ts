import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam } from "@/types/global";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBikes: builder.query({
      query: (query) => {
        const params = new URLSearchParams();
        if (query) {
          query.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/bikes",
          method: "GET",
          params,
        };
      },
      providesTags: ["Bike"],
    }),
    createBike: builder.mutation({
      query: (data) => ({
        url: `/bikes`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bike"],
    }),
    singleBike: builder.query({
      query: (id) => ({
        url: `/bikes/${id}`,
        method: "GET",
      }),
      providesTags: ["Bike"],
    }),
    updateBike: builder.mutation({
      query: ({ data, id }) => ({
        url: `/bikes/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Bike"],
    }),
    deleteBike: builder.mutation({
      query: (id) => ({
        url: `/bikes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bike"],
    }),
  }),
});

export const {
  useGetBikesQuery,
  useSingleBikeQuery,
  useDeleteBikeMutation,
  useCreateBikeMutation,
  useUpdateBikeMutation,
} = bikeApi;
