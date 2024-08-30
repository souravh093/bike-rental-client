/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { formatDate } from "@/utils/dateFormat";
import { useNavigate } from "react-router-dom";

interface CreateBikeFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
}

const CreateBookingForm: React.FC<CreateBikeFormProps> = ({ setOpen, id }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const startTime = formatDate(data.startTime);

    navigate(`/dashboard/payment-booking`, {
      state: { id: id, startTime: startTime, paidStatus: "initial-paid" },
    });

    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="startTime">Start Time</Label>
        <Input
          type="datetime-local"
          id="startTime"
          className="dark:bg-gray-800 dark:text-gray-100"
          {...register("startTime")}
        />
        {errors.startTime && (
          <p className="text-red-500">{errors.startTime.message as string}</p>
        )}
      </div>

      <div className="flex items-center justify-start">
        <Button type="submit">Pay</Button>
      </div>
    </form>
  );
};

export default CreateBookingForm;
