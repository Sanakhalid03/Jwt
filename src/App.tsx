import { Toaster } from "react-hot-toast";
import "./App.css";
//import Login from './Components/Login'
import Profile from "./Components/Profile";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import ProtectedRoute from "./Components/ProtectedRoute";
import { CardDemo } from "./Components/Card";

import SplashCursor from "./Components/SplashCursor";

function App() {
  return (
    <>

     
        <SplashCursor/>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<CardDemo />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
