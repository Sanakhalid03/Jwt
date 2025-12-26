import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"


function Header() {
    const navigate=useNavigate()
     const token=localStorage.getItem("token")
       const handleLogout=()=>{
        navigate("/")
        localStorage.removeItem("token")
        toast.success("Logout Successfully")
    }
  return (
    <div className="flex justify-center items-center gap-7 p-8 bg-purple-800">
         <Link to="/profile" className="text-white text-xl md:text-2xl lg:text-2xl font-medium">Profile</Link>
         {
            token? 
             <button onClick={handleLogout} className="text-white text-xl md:text-2xl lg:text-2xl font-medium cursor-pointer">Logout</button>
             :
            <Link to="/" className="text-white text-xl md:text-2xl lg:text-2xl font-medium">Login</Link>
         }
     
     
     
    </div>
  )
}

export default Header