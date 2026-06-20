import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { UserAuth } from "../app/context/AuthContext";
import LoadingSpiner from "../components/features/loading/LoadingSpiner";
const SigninPage = () => {
  const [error, setErr] = useState<string>("");
  const[loading,setLoading]=useState<boolean>(false);
  const navigate = useNavigate();
  const{logIn}=UserAuth();
  const handleClick = () => {
    navigate("/signup");
  };
  const loginSchema = z.object({
    email: z.email("Email not valid").min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
  });
  type loginTypevalues = z.infer<typeof loginSchema>;
  const onSubmit: SubmitHandler<loginTypevalues> = async (data:loginTypevalues) => {
     try{
      setErr('');
      setLoading(true);
     const user=await logIn(data.email,data.password);
     console.log('user',user);
      navigate('/');
     }catch(err){
      setErr('Email or password is invalid');
      console.log('login',err);
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
    <div className=" mt-18 flex w-full min-h-[80vh]  items-center justify-center px-4  py-8 sm:px-2">
      <div className="flex flex-col px-3 sm:px-8 py-8 items-center gap-3 sm:gap-4 border w-120 min-w-0 rounded-2xl  border-gray-300 ">
        <div className="flex flex-col items-center gap-1 pb-2 sm:pb-3">
          <p className=" text-2xl sm:text-2xl tracking-wider text-green-500 font-bold">
            Welcome Back
          </p>
          <p className="text-gray-500 text-sm sm:text-base">
            Login to your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full px-2"
          noValidate
        >
          {error && <p className="text-red-400">{error}</p>}
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
          <input
            {...register("password")}
            className="border border-gray-300 w-full shadow-xs p-2 sm:p-3 rounded-lg focus:outline-none focus:border-green-500 focus:border-2 text-gray-700"
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-400">{errors.password?.message}</p>
          )}
          <button disabled={loading} className=" w-full p-2 sm:p-3 hover:cursor-pointer rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold flex items-center justify-center">
            {loading ? <LoadingSpiner/>:'Login'}
          </button>
        </form>
        <div className="flex gap-1 ">
          <p className="text-gray-500">Dont have an account?</p>
          <button
            onClick={handleClick}
            className="cursor-pointer text-green-600"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
