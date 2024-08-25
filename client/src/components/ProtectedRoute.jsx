import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const [login,setLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  const getToken = () => {
    const token = localStorage.getItem("authToken");
    const expiryTime = localStorage.getItem("authTokenExpiry");
  
    if (token && expiryTime) {
      if (new Date().getTime() > parseInt(expiryTime, 10)) {
        // Token is expired
        localStorage.removeItem("authToken");
        localStorage.removeItem("authTokenExpiry");
        return null;
      }
      return token;
    }
    return null;
  };

  useEffect(() => {
    const userIsLogin = getToken()
    
    if (userIsLogin) {
      setLogin(true);
    }else{
      navigate('/login')
    }
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!login) {
    return null; 
  }

  return children;
}

export default ProtectedRoute;
