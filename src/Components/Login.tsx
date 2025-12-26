import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import { FaWpforms } from "react-icons/fa";
import type { dataType } from './Type';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



function Form() {
   const navigate=useNavigate()
    const schema = yup.object().shape({
        Email:yup.string().email("Invalid Email Format").required("Your Email is Required"),
        Password:yup.string().required("Your Password is Required").min(4).max(8),
   
    })
     const { register, handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema)
     });
   const onSubmit =(data:dataType)=> {
    const payload={
      email:data.Email,
      password:data.Password,
    }
    
    axios.post("https://api.escuelajs.co/api/v1/auth/login",payload)
    .then((res)=>{
      localStorage.setItem("token",(res.data.access_token))
      toast.success("Login Successfull")
      navigate("/profile")
      console.log(res)
    })
    .catch(()=>{
      toast.error("Incorrect Credentials")
    })

 }
  return (
    <>
    <div className="flex  justify-center  py-8">
    <form onSubmit={handleSubmit(onSubmit)}className="flex flex-col gap-3  border-purple-700 border-2 rounded-lg w-[95%] max-w-130 bg-white p-4 py-6 mt-8 ">
        <div className="flex justify-center items-center p-3 gap-1">
        <h1 className="text-purple-800 text-3xl font-bold ">Login</h1>
        <FaWpforms className="text-2xl text-purple-800"/>
        </div>
   
       <div className="flex flex-col items-start p-2 gap-1 w-[90%] mx-auto rounded-md border-2 border-purple-700">
       <label className="text-lg font-medium text-purple-800">Email</label>
       <input type="email" placeholder="Email..." className="text-md font-medium outline-0 w-full" {...register("Email")}/>
       <span className='text-red-600 font-medium'>{errors.Email?.message}</span>
       </div>
   
       <div className="flex flex-col items-start p-2 gap-1 w-[90%] mx-auto rounded-md border-2 border-purple-700">
       <label className="text-lg font-medium text-purple-800">Password</label>
       <input type="password" placeholder="Password..." className="text-md font-medium outline-0 w-full" {...register("Password")}/>
       <span className='text-red-600 font-medium'>{errors.Password?.message}</span>
       </div>

       <button type="submit" className="text-md font-medium outline-0 w-[90%] mx-auto bg-purple-950 text-white p-3 rounded-lg mt-5  cursor-pointer transition hover:bg-purple-900">Submit</button>
    </form>
    </div>
    </>
  )
}

export default Form