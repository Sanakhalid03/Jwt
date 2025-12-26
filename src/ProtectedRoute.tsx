import { useEffect } from "react"
import toast from "react-hot-toast"
import { Navigate, Outlet } from "react-router-dom"


function ProtectedRoute() {
     const token=localStorage.getItem("token")
    useEffect(()=>{
        if(!token){
        toast.error("You are not logged in")
     }
    },[token]) 
  return token ? <Outlet/> : <Navigate to={"/"} replace /> 
}

export default ProtectedRoute