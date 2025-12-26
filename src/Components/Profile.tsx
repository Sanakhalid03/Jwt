import axios from "axios"
import { useEffect, useState } from "react"
import type { userType } from "./Type"


function Profile() {
    const [userdata,setUserData]=useState<userType| null>(null)
    const token=localStorage.getItem("token")
    const headers={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const getProfile=()=>{
        axios.get("https://api.escuelajs.co/api/v1/auth/profile",headers)
        .then((res)=>{
            setUserData(res.data)
            console.log(res)
        })
        .catch(()=>{
            console.log("error")
        })
    }
    useEffect(()=>{
        getProfile()
    },[])
 
  return (
    <div className="flex flex-col items-center gap-6">
        <h1 className="text-center text-3xl text-purple-900 p-5 font-medium">Profile Page</h1>
        <div className=" flex justify-center items-center flex-col gap-3 bg-purple-200 rounded-xl border border-purple-900 p-8">
            <div className="text-2xl font-semibold flex flex-col items-center gap-2 md:flex-row lg:flex-row">
                 <span className=" text-purple-950">Name:</span> <span className="text-purple-700">{userdata?.name}</span> 
            </div>
            <div className="text-2xl font-semibold flex flex-col items-center  gap-2 md:flex-row lg:flex-row">
                 <span className=" text-purple-950">Email:</span> <span className="text-purple-700">{userdata?.email}</span> 
            </div>
            <div className="text-2xl font-semibold flex flex-col items-center  gap-2 md:flex-row lg:flex-row">
                 <span className=" text-purple-950">Role:</span> <span className="text-purple-700">{userdata?.role}</span> 
            </div>
            <img src={userdata?.avatar} alt="" className="w-40 h-40 rounded-full border-2 border-purple-900 mt-3" />
        </div>
       
        
    </div>
  )
}

export default Profile