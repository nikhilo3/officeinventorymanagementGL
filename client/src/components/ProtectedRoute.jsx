import React, { useEffect } from "react";
import { useNavigate } from "react-router";

function ProtectedRoute({ isLogin, children }) {

    const navigate = useNavigate()

  console.log("ProtectedRoute isLogin:", isLogin);

  useEffect(()=>{
    navigate('/login')
  })
  if (!isLogin) {
    console.log('login first');
    
    return navigate('/login')
  }
  return children;
}

export default ProtectedRoute;