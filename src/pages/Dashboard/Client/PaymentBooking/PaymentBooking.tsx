/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { Bike, Tag, DollarSign } from "lucide-react";
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

export default function PaymentBooking() {
  const location = useLocation();
  const { id, startTime, paidStatus, totalPrice, bookingId } =
    location.state || {};

  console.log(location.state);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const { data: bikeData, isLoading } = useSingleBikeQuery(id);
  const [createBooking, { isLoading: bookingLoading }] =
    useCreateRentalMutation();

  const [updateWithPayment, { isLoading: paymentLoading }] =
    useUpdateWithPaymentMutation();

  if (isLoading) {
    return <Loader />;
  }

  const { name, pricePerHour, image } = bikeData.data;

  const bikeDetails = {
    name: name,
    image: image,
    pricePerHour: pricePerHour,
  };

  const totalPrices = totalPrice - discount;

  const handleCouponApply = () => {
    if (couponCode.toLowerCase() === "bike50") {
      setDiscount(totalPrice * 0.5);
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
      console.log("test1", totalPrices);
      try {
        const res = await updateWithPayment({
          id: bookingId,
          amount: totalPrices,
        }).unwrap();

        console.log(res);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Payment Here
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white/70 backdrop-blur-lg border-none shadow-lg">
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
                    <span>${bikeDetails.pricePerHour} / hour</span>
                  </div>
                  <div className="flex items-center text-xl font-bold text-gray-800">
                    <DollarSign className="w-6 h-6 mr-2" />
                    <span>${totalPrices}</span>
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
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="bg-white/50 border-gray-300 text-gray-800 placeholder-gray-400"
                    />
                    <Button onClick={handleCouponApply} variant="outline">
                      Apply
                    </Button>
                  </div>
                  {discount > 0 && (
                    <p className="text-green-600 mb-4">
                      Coupon applied! You saved ${discount}
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
