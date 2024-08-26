import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam } from "@/types/global";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/users/me",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    updateRole: builder.mutation({
      query: ({data, id}) => ({
        url: `/users/role/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    getAllUsers: builder.query({
      query: (query) => {
        const params = new URLSearchParams();

        if (query) {
          query.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/users/all",
          method: "GET",
          params,
        };
      },
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateRoleMutation,
} = userApi;
