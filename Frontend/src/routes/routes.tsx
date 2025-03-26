import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Home } from "../pages/Home";
import  SignIn  from "../pages/auth/signin";
import  SignUp from "../pages/auth/signup";


const RoutesComponent = () => {

    const {authuser,CheckAuth,isCheckAuth} =  useAuthStore()

    useEffect(() => {
        CheckAuth()
      },[CheckAuth])
    
    if(isCheckAuth && !authuser){
        return(
        <div className="flex items-center justify-center h-screen">
            <Loader className="size-10 animate-spin"/>
        </div>
        )
    } 

  return (
    <div>
        <Routes >
          <Route path="/" element={ <Home /> } /> 
          <Route path="/signup" element={!authuser ? <SignUp  /> : <Navigate to={'/'} />} />
          <Route path="/signin" element={!authuser ?  <SignIn/> : <Navigate to={'/'} />} />
          {/* <Route path="/settings" element={<SettingsPage />}/>
          <Route path="/profile" element={authuser ? <Profile /> : <Navigate to={'/login'}/> }/> */}

        </Routes>
      
    </div>
  )
}


export default RoutesComponent