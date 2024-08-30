import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import authImage from "../../assets/auth/loginimage.jpg";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validation/authValidation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import { AuthFormFieldProps } from "@/types/auth";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { toast } from "@/components/ui/use-toast";
import { verifyToken } from "@/utils/verifyToken";
import { setUser } from "@/redux/features/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await login(data).unwrap();


    const user = verifyToken(res.token);

    try {
      dispatch(
        setUser({
          user,
          token: res.token,
        })
      );

      toast({ title: res.message });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast({ title: "Something went wrong" }); 
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
      <div className="col-span-1 sm:hidden hidden md:hidden lg:block">
        <img
          src={authImage}
          alt="auth image"
          className="h-screen object-cover"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-4 items-center justify-center bg-[#DDFCF5] h-screen dark:bg-gray-900">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 bg-white dark:bg-gray-800 p-10 rounded-md shadow-sm"
          >
            <SignupFormField
              name="email"
              label="Email"
              placeholder="Enter your email"
              inputType="email"
              formControl={form.control}
            />
            <SignupFormField
              name="password"
              label="Password"
              placeholder="Enter your password"
              description="At least 8 characters."
              inputType="password"
              formControl={form.control}
            />
            <Button type="submit">{isLoading ? "Logging..." : "Login"}</Button>
          </form>
        </Form>

        <h3 className="font-semibold">
          If you don't have account:{" "}
          <Link
            className="text-green-500 hover:font-bold"
            to={"/auth/register"}
          >
            Signup now
          </Link>
        </h3>
      </div>
    </div>
  );
};

const SignupFormField: React.FC<AuthFormFieldProps> = ({
  name,
  label,
  placeholder,
  description,
  inputType,
  formControl,
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
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Login;
