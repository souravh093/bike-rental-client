/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/validation/bikeValidation";
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
import { useCreateBikeMutation } from "@/redux/features/bike/bikeApi";
import { toast } from "../ui/use-toast";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/firebase.config";


interface CreateBikeFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateBikeForm: React.FC<CreateBikeFormProps> = ({ setOpen }) => {
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [createBike, { isLoading }] = useCreateBikeMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const uploadImageToFirebase = async (
    imageFile: File
  ): Promise<string | null | undefined> => {
    const storageRef = ref(storage, `images/${imageFile.name}`);
    setIsImageUploading(true);

    try {
      const snapshot = await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.log("Error uploading image", error);
      return null;
    } finally {
      setIsImageUploading(false);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const imageFile = data.image?.[0];
    const imageUrl = await uploadImageToFirebase(imageFile);
    console.log(imageUrl, isLoading);

    const bikeData = {
      ...data,
      cc: Number(data.cc),
      image: imageUrl,
    };

    try {
      const res = await createBike(bikeData).unwrap();
      console.log(res);

      if (res.success) {
        toast({
          variant: "default",
          title: res.message,
        });
      }

      setOpen(false);
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: error?.data?.message,
      });
    }
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
          <Controller
            name="cc"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value || ""}>
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
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value || ""}>
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
          <Input id="model" {...register("model")} />
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
      <div className="flex items-center justify-start">
        <Button type="submit" disabled={isLoading || isImageUploading}>
          {isImageUploading
            ? "Uploading Image..."
            : isLoading
            ? "Creating Bike..."
            : "Create Bike"}
        </Button>
      </div>
    </form>
  );
};

export default CreateBikeForm;