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
  }),
});

export const { useGetBikesQuery } = bikeApi;
