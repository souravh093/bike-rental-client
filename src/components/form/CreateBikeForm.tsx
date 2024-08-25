import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/validation/bikeValidation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const CreateBikeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);

    // Access the image file
    const imageFile = data.image?.[0];
    console.log(imageFile);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-5">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && (
            <p className="text-red-500">{errors.name.message as string}</p>
          )}
        </div>

        <div>
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            type="number"
            {...register("year", { valueAsNumber: true })}
          />
          {errors.year && (
            <p className="text-red-500">{errors.year.message as string}</p>
          )}
        </div>

        <div>
          <Label htmlFor="cc">CC</Label>
          <Input
            id="cc"
            type="number"
            {...register("cc", { valueAsNumber: true })}
          />
          {errors.cc && (
            <p className="text-red-500">{errors.cc.message as string}</p>
          )}
        </div>

        <div>
          <Label htmlFor="brand">Brand</Label>
          <Input id="brand" {...register("brand")} />
          {errors.brand && (
            <p className="text-red-500">{errors.brand.message as string}</p>
          )}
        </div>

        <div>
          <Label htmlFor="modal">Modal</Label>
          <Input id="modal" {...register("modal")} />
          {errors.modal && (
            <p className="text-red-500">{errors.modal.message as string}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Input height={50} id="description" {...register("description")} />
        </div>

        <div>
          <Label htmlFor="pricePerHour">Price Per Hour</Label>
          <Input
            id="pricePerHour"
            type="number"
            {...register("pricePerHour", { valueAsNumber: true })}
          />
          {errors.pricePerHour && (
            <p className="text-red-500">
              {errors.pricePerHour.message as string}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="image">Image</Label>
          <Input
            id="image"
            accept="image/*"
            type="file"
            {...register("image")}
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message as string}</p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CreateBikeForm;
