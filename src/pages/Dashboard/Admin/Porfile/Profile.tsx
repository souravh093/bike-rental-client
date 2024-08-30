/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/features/user/userApi";
import { UpdateUserProfile } from "@/types/auth";
import { updateSignupSchema } from "@/validation/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const Profile = () => {
  const [updateUser, { isLoading: updateLoading }] = useUpdateProfileMutation();
  const {
    data: userData,
    isLoading,
    isFetching,
    error,
  } = useGetProfileQuery(undefined);

  const form = useForm<z.infer<typeof updateSignupSchema>>({
    resolver: zodResolver(updateSignupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    if (userData) {
      form.reset({
        name: userData.data.name,
        email: userData.data.email,
        phone: userData.data.phone,
        address: userData.data.address,
      });
    }
  }, [userData, form]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
    };

    try {
      const res = await updateUser(userData).unwrap();

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
  };

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (error) {
    return <div>Error loading profile data</div>;
  }

  if (!userData) {
    return <div>No profile data available</div>;
  }

  const { name } = userData.data;

  return (
    <div>
      <div className="text-5xl font-black flex justify-center mb-5 uppercase border-b-2  items-center py-10 bg-gray-200 dark:bg-gray-900">
        <h1>Welcome {name}</h1>
      </div>

      <div className="col-span-2 flex flex-col gap-4 items-center justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 p-10 "
          >
            <div className="grid grid-cols-2 gap-5">
              <SignupFormField
                name="name"
                label="Name"
                placeholder="Enter your name"
                inputType="text"
                formControl={form.control}
              />
              <SignupFormField
                name="email"
                label="Email"
                placeholder="Enter your email"
                inputType="text"
                formControl={form.control}
              />
              <SignupFormField
                name="phone"
                label="Phone Number"
                placeholder="Enter your phone number"
                inputType="text"
                formControl={form.control}
              />
              <SignupFormField
                name="address"
                label="Address"
                placeholder="Enter your address"
                inputType="text"
                formControl={form.control}
              />
            </div>
            <Button type="submit">
              {updateLoading || isFetching ? "Updating..." : "Update"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

const SignupFormField: React.FC<UpdateUserProfile> = ({
  name,
  label,
  placeholder,
  description,
  inputType,
  formControl,
  required,
}) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={inputType || "text"}
              {...field}
              className="w-96"
              required={required}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Profile;
