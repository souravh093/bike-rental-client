/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { Bike, Tag, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "react-router-dom";
import Loader from "@/components/shared/Loader";
import { useSingleBikeQuery } from "@/redux/features/bike/bikeApi";
import {
  useCreateRentalMutation,
  useUpdateWithPaymentMutation,
} from "@/redux/features/book/bookApi";
import { toast } from "@/components/ui/use-toast";
import {
  useGetAllCouponsQuery,
  useGetCopyCouponQuery,
} from "@/redux/features/coupon/couponApi";

export default function PaymentBooking() {
  const { data: copyCoupon } = useGetCopyCouponQuery(undefined);
  console.log(copyCoupon);
  const location = useLocation();
  const { id, startTime, paidStatus, totalPrice, bookingId } =
    location.state || {};

  const { data: couponData } = useGetAllCouponsQuery(undefined);
  const coupons = couponData?.data;

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const { data: bikeData, isLoading } = useSingleBikeQuery(id);
  const [createBooking, { isLoading: bookingLoading }] =
    useCreateRentalMutation();

  const [updateWithPayment, { isLoading: paymentLoading }] =
    useUpdateWithPaymentMutation();

  useEffect(() => {
    if (copyCoupon?.data?.coupon) {
      setCouponCode(copyCoupon.data.coupon);
    }
  }, [copyCoupon]);

  if (isLoading) {
    return <Loader />;
  }

  const { name, pricePerHour, image } = bikeData.data;

  const bikeDetails = {
    name: name,
    image: image,
    pricePerHour: pricePerHour,
  };

  const totalPrices = totalPrice - Number(discount.toFixed(0));

  console.log(couponCode, "couponCode");
  console.log(copyCoupon?.data?.coupon, "copyCoupon");

  const handleCouponApply = () => {
    const matchedCoupon = coupons.find(
      (coupon: { title: string; coupon: string; discount: number }) =>
        coupon.coupon.toLowerCase() === couponCode.toLowerCase()
    );
    if (matchedCoupon) {
      setDiscount(totalPrice * (matchedCoupon.discount / 100));
    } else {
      setDiscount(0);
    }
  };

  const handlePayment = async () => {
    if (paidStatus === "initial-paid") {
      try {
        const res = await createBooking({ bikeId: id, startTime }).unwrap();

        if (res.success) {
          toast({
            variant: "default",
            title: res.message,
          });

          window.location.href = res.paymentSession.payment_url;
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: error?.data?.message,
        });
      }
    } else {
      try {
        const res = await updateWithPayment({
          id: bookingId,
          amount: totalPrices,
        }).unwrap();

        if (res.success) {
          toast({
            variant: "default",
            title: res.message,
          });
          window.location.href = res.paymentSession.payment_url;
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: error?.data?.message,
        });
      }
    }
  };

  return (
    <div className="min-h-screen dark:bg-gray-900  p-8">
      <div className="max-w-4xl mx-auto ">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Payment Here
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white/70  backdrop-blur-lg border-none shadow-lg">
            <CardContent className="p-6">
              <div className="aspect-video relative overflow-hidden rounded-lg mb-6">
                <img src={bikeDetails.image} alt={bikeDetails.name} />
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                {bikeDetails.name}
              </h2>
              {!paidStatus && (
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <Tag className="w-5 h-5 mr-2" />
                    <span>{bikeDetails.pricePerHour} BDT / hour</span>
                  </div>
                  <div className="flex items-center text-xl font-bold text-gray-800">
                    <IndianRupee className="w-6 h-6 mr-2" />
                    <span>{totalPrices} BDT</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-lg border-none shadow-lg">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              {!paidStatus && (
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    Apply Coupon
                  </h3>
                  <div className="flex space-x-2 mb-6">
                    <Input
                      type="text"
                      placeholder="Enter coupon code"
                      defaultValue={
                        copyCoupon?.data?.coupon && copyCoupon?.data?.coupon
                      }
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="bg-white/50 border-gray-300 text-gray-800 placeholder-gray-400"
                    />
                    <Button onClick={handleCouponApply} variant="outline">
                      Apply
                    </Button>
                  </div>
                  {discount > 0 && (
                    <p className="text-green-600 mb-4">
                      Coupon applied! You saved {discount} BDT
                    </p>
                  )}
                </div>
              )}
              <div>
                <Button
                  onClick={handlePayment}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white"
                  size="lg"
                >
                  <Bike className="w-5 h-5 mr-2" />
                  {bookingLoading || paymentLoading
                    ? `Booking...`
                    : `Ride Now for ${paidStatus ? "100" : `${totalPrices}`}`}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
