/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCreateCouponMutation } from "@/redux/features/coupon/couponApi";
import { toast } from "../ui/use-toast";
import { useState } from "react";

interface CreateCouponFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateCouponForm: React.FC<CreateCouponFormProps> = ({ setOpen }) => {
  const [createCoupon, { isLoading }] = useCreateCouponMutation();
  const [couponCode, setCouponCode] = useState("");

  function generateCouponCode(length: number): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

  const handleGenerateCouponCode = () => {
    const newCouponCode = generateCouponCode(8);
    setCouponCode(newCouponCode);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const couponInfo = {
      coupon: couponCode,
      title: data.title,
      discount: Number(data.discount),
    };

    try {
      const res = await createCoupon(couponInfo).unwrap();

      if (res.success) {
        toast({
          variant: "default",
          title: res.message,
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error?.data?.message,
      });
    }
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="title">Coupon Title</Label>
        <Input type="text" id="title" {...register("title")} />
        {errors.title && (
          <p className="text-red-500">{errors.title.message as string}</p>
        )}
      </div>
      <div>
        <Label htmlFor="discount">Coupon Discount</Label>
        <Input type="number" id="discount" {...register("discount")} />
        {errors.discount && (
          <p className="text-red-500">{errors.discount.message as string}</p>
        )}
      </div>
      <div>
        <Label htmlFor="couponCode">Coupon Code</Label>
        <div className="flex items-center">
          <Input type="text" id="couponCode" value={couponCode} readOnly />
          <Button type="button" onClick={handleGenerateCouponCode}>
            Generate Code
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-start">
        <Button type="submit">
          {isLoading ? "Creating..." : "Create Coupon"}
        </Button>
      </div>
    </form>
  );
};

export default CreateCouponForm;
