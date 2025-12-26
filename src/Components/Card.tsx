import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import type { dataType } from './Type';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export function CardDemo() {
    const [show,setShow]=useState(false)
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
    
    <div className=' flex justify-center mt-15'>
     
      
       <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <label htmlFor='email' >Email</label>
       <Input type="email" id="email" placeholder="Email..." className="text-md font-medium outline-0 w-full" {...register("Email")}/>
       <span className='text-red-600 font-medium'>{errors.Email?.message}</span>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor='password'>Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <div className='flex gap-2 items-center cursor-pointer'>
                 <Input type={show? "type" :"password"} id="password" placeholder="Password..." className="text-md font-medium outline-0 w-full" {...register("Password")}/>
                 <span onClick={()=>setShow(!show)}>{show ? <FaEyeSlash />: <FaEye/>} </span>
              </div>
             
               <span className='text-red-600 font-medium'>{errors.Password?.message}</span>
            </div>
          </div>
           <div className='flex flex-col gap-2 mt-4'>
            <Button type="submit" className="w-full cursor-pointer">
          Login
        </Button>
        <Button variant="outline" className="w-full cursor-pointer">
          Login with Google
        </Button>
          </div>
        </form>
      </CardContent>
    
    </Card>
    </div>
   
  )
}
