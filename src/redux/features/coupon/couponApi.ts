import { baseApi } from "@/redux/api/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCoupon: builder.mutation({
      query: (data) => ({
        url: "/coupons",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Coupon"],
    }),
    updateCoupon: builder.mutation({
      query: ({ data, id }) => ({
        url: `/coupons/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Coupon"],
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/coupons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupon"],
    }),
    getAllCoupons: builder.query({
      query: () => ({
        url: "/coupons",
        method: "GET",
      }),
      providesTags: ["Coupon"],
    }),
    upsertCopyCoupon: builder.mutation({
      query: (coupon) => ({
        url: `/copy-coupon`,
        method: "PUT",
        body: coupon,
      }),
    }),
    getCopyCoupon: builder.query({
      query: () => ({
        url: `/copy-coupon`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  useGetAllCouponsQuery,
  useUpsertCopyCouponMutation,
  useGetCopyCouponQuery,
} = couponApi;
