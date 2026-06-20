import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import LoadingSpiner from "../components/features/loading/LoadingSpiner";
import { UserAuth } from "../app/context/AuthContext";

const SignupPage = () => {
  const [err, setErr] = useState("");
  const[loading,setLoading]=useState<boolean>(false);
  const navigate = useNavigate();
  const{signUp,addToUserDetails}=UserAuth();
  const handleClick = () => {
    navigate('/signin')
  };
  const loginSchema = z.object({
    firstName: z.string().min(3, "At least 3 charecters are required"),
    lastName: z.string().min(3, "At least 3 charecters are required"),
    city: z.string().min(1, "City is required"),
    zipCode: z.string().min(1, "Zip code is required"),
    phone: z.string().min(1, "Phone number is required"),
    email: z.email("Email not valid").min(1, "Email is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Enter at least 8 charecters"),
    address: z.string().min(1, "Full Address"),
  });
  type loginTypevalues = z.infer<typeof loginSchema>;

  const onSubmit: SubmitHandler<loginTypevalues> = async (data) => {
     setLoading(true);
  try{
    setErr('');
    await signUp(data.email,data.password);
    await addToUserDetails(data);
    navigate('/signIn')
  } catch(err){
    setErr(String(err));
  } finally{
    setLoading(false);
  }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginTypevalues>({ resolver: zodResolver(loginSchema) });
  return (
    <div className="mt-18 flex w-full min-h-[80vh]  items-center justify-center px-2 py-8">
      <div className="flex flex-col px-3 sm:px-8 py-8 items-center gap-3 sm:gap-4 border w-120 min-w-0 rounded-2xl  border-gray-300 ">
        <div className="flex flex-col items-center gap-1 pb-2 sm:pb-3">
          <p className=" text-2xl tracking-wider text-green-500 font-bold">
            Create Account
          </p>
          <p className="text-gray-500 text-sm sm:text-base ">
            Join gocart shopping experience
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
          noValidate
        >
          <input
            {...register("firstName")}
            className="border border-gray-300 w-full p-2 shadow-xs sm:p-3 rounded-lg focus:outline-none focus:border-green-500 focus:border-2 text-gray-700  "
            type="text"
            placeholder="First Name"
          />
          {errors.firstName && (
            <p className="text-red-400">{errors.firstName?.message}</p>
          )}
          <input
            {...register("lastName")}
            className="border border-gray-300 w-full p-2 shadow-xs sm:p-3 rounded-lg focus:outline-none focus:border-green-500 focus:border-2 text-gray-700  "
            type="text"
            placeholder="Last Name"
          />
          {errors.lastName && (
            <p className="text-red-400">{errors.lastName?.message}</p>
          )}
          <input
            {...register("city")}
            className="border border-gray-300 w-full p-2 shadow-xs sm:p-3 rounded-lg focus:outline-none focus:border-green-500 focus:border-2 text-gray-700  "
            type="text"
            placeholder="Your City"
          />
          {errors.city && (
            <p className="text-red-400">{errors.city?.message}</p>
          )}
          <input
            {...register("zipCode")}
            className="border border-gray-300 w-full p-2 shadow-xs sm:p-3 rounded-lg focus:outline-none focus:border-green-500 focus:border-2 text-gray-700  "
            type="text"
            placeholder="Zip Code"
          />
          {errors.zipCode && (
            <p className="text-red-400">{errors.zipCode?.message}</p>
          )}
          <input
            {...register("phone")}
            className="border border-gray-300 w-full p-2 shadow-xs sm:p-3 rounded-lg focus:outline-none focus:border-green-500 focus:border-2 text-gray-700  "
            type="text"
            placeholder="Phone Number"
          />
          {errors.phone && (
            <p className="text-red-400">{errors.phone?.message}</p>
          )}

          <input
            onClick={()=>setErr('')}
            {...register("email")}
            className="border border-gray-300 w-full p-2 shadow-xs sm:p-3 rounded-lg focus:outline-none focus:border-green-500 focus:border-2 text-gray-700  "
            type="email"
            placeholder="Email Address   "
          
          />
          {errors.email && (
            <p className="text-red-400">{errors.email?.message}</p>
          )}
          {err && <p className="text-red-400">{err}</p>}
          <input
            {...register("password")}
            className="border border-gray-300 w-full shadow-xs p-2 sm:p-3 rounded-lg focus:outline-none focus:border-green-500 focus:border-2 text-gray-700"
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-400">{errors.password?.message}</p>
          )}
          <textarea
            {...register("address")}
            className="border border-gray-300 w-full shadow-xs p-2 sm:p-3 rounded-lg focus:outline-none focus:border-green-500 focus:border-2 text-gray-700"
            placeholder="Full Address"
          ></textarea>
          {errors.address && (
            <p className="text-red-400">{errors.address?.message}</p>
          )}

          <button disabled={loading} className=" w-full p-2 sm:p-3 hover:cursor-pointer rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold flex items-center justify-center">
             {loading ? <LoadingSpiner/> :'Create Acount'}
          </button>
        </form>
        <div className="flex gap-1 ">
          <p className="text-gray-500">Already have an account?</p>
          <button
            onClick={handleClick}
            className="cursor-pointer text-green-600 "
          >
            login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
