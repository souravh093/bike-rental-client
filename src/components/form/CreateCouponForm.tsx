/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCreateCouponMutation } from "@/redux/features/coupon/couponApi";
import { toast } from "../ui/use-toast";

interface CreateCouponFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateCouponForm: React.FC<CreateCouponFormProps> = ({ setOpen }) => {
  const [createCoupon, { isLoading }] = useCreateCouponMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    const couponInfo = {
      coupon: "F10AD442",
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

      <div className="flex items-center justify-start">
        <Button type="submit">
          {isLoading ? "Creating..." : "Create Coupon"}
        </Button>
      </div>
    </form>
  );
};

export default CreateCouponForm;
