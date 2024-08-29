/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateBikeSchema } from "@/validation/bikeValidation";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "../ui/use-toast";
import React from "react";
import { TBike } from "@/types/bike";
import { useUpdateBikeMutation } from "@/redux/features/bike/bikeApi";

const apiKey = "800d9ccab79ca9e964c7b1edac462750";

interface CreateBikeFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: TBike;
}

const EditBikeForm: React.FC<CreateBikeFormProps> = ({ setOpen, data }) => {
  const [updateBike, { isLoading }] = useUpdateBikeMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateBikeSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {

    let imageUrl;

    if (values.image?.[0]) {
      const imageFile = values.image[0];

      const uploadImageToImgbb = async (
        imageFile: File
      ): Promise<string | null | undefined> => {
        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("key", apiKey || "");

        try {
          const res = await fetch("https://api.imgbb.com/1/upload", {
            method: "POST",
            body: formData,
          });
          const result = await res.json();

          if (result.success) {
            return result.data.url;
          }
        } catch (error) {
          console.log("Error uploading image", error);
          return null;
        }
      };

      imageUrl = await uploadImageToImgbb(imageFile);
    }

    const bikeData = {
      ...values,
      cc: Number(values.cc),
      image: imageUrl ? imageUrl : data?.image,
    };


    try {
      const res = await updateBike({ data: bikeData, id: data._id }).unwrap();

      if (res.success) {
        toast({
          variant: "default",
          title: res.message,
        });
      }

      setOpen(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error?.data?.message,
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input defaultValue={data?.name} id="name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500">{errors.name.message as string}</p>
            )}
          </div>

          <div>
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              defaultValue={data?.year}
              type="number"
              {...register("year", { valueAsNumber: true })}
            />
            {errors.year && (
              <p className="text-red-500">{errors.year.message as string}</p>
            )}
          </div>

          <div>
            <Controller
              name="cc"
              defaultValue={(data?.cc as number).toString()}
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a CC" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                    <SelectItem value="110">110</SelectItem>
                    <SelectItem value="125">125</SelectItem>
                    <SelectItem value="150">150</SelectItem>
                    <SelectItem value="160">160</SelectItem>
                    <SelectItem value="180">180</SelectItem>
                    <SelectItem value="200">200</SelectItem>
                    <SelectItem value="250">250</SelectItem>
                    <SelectItem value="300">300</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.cc && (
              <p className="text-red-500">{errors.cc.message as string}</p>
            )}
          </div>

          <div>
            <Controller
              name="brand"
              defaultValue={data?.brand}
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="honda">Honda</SelectItem>
                    <SelectItem value="yamaha">Yamaha</SelectItem>
                    <SelectItem value="suzuki">Suzuki</SelectItem>
                    <SelectItem value="bajaj">Bajaj</SelectItem>
                    <SelectItem value="hero">Hero</SelectItem>
                    <SelectItem value="tvs">TVS</SelectItem>
                    <SelectItem value="kawasaki">Kawasaki</SelectItem>
                    <SelectItem value="royal-enfield">Royal Enfield</SelectItem>
                    <SelectItem value="keeway">Keeway</SelectItem>
                    <SelectItem value="lifan">Lifan</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            {errors.brand && (
              <p className="text-red-500">{errors.brand.message as string}</p>
            )}
          </div>

          <div>
            <Label htmlFor="model">Model</Label>
            <Input
              defaultValue={data?.model}
              id="model"
              {...register("model")}
            />
            {errors.modal && (
              <p className="text-red-500">{errors.modal.message as string}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              defaultValue={data?.description}
              height={50}
              id="description"
              {...register("description")}
            />
          </div>

          <div>
            <Label htmlFor="pricePerHour">Price Per Hour</Label>
            <Input
              id="pricePerHour"
              defaultValue={data?.pricePerHour}
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
        <div className="flex items-center justify-start">
          <Button type="submit">
            {isLoading ? "Updating Bike..." : "Update Bike"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditBikeForm;
