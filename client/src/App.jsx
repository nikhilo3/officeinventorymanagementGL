import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import MainLayoutPage from "./pages/MainLayoutPage";
import Items from "./pages/Items";
import Order from "./pages/Order";
import IssueItem from "./pages/IssueItem";
import ReturnItem from "./pages/ReturnItem";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isLogin, setIsLogin] = useState(false);

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
      setIsLogin(true);
    }
  }, []);




  const handleLogin = (data) => {
    setIsLogin(true);
    const expiryTime = new Date().getTime() + (72 * 60 * 60 * 1000); // 72 hours
    localStorage.setItem("authToken", data.authToken);
    localStorage.setItem("authTokenExpiry", expiryTime);
  };

  const handleLogout = () => {
    setIsLogin(false);
    localStorage.removeItem("authToken");
  };

  

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login onlogin={handleLogin} />} />
        <Route
          path="/registration"
          element={<Registration onlogin={handleLogin} />}
        />

        <Route
          path="/"
          element={
            <MainLayoutPage onLogout={handleLogout} isLogin={isLogin}>
              <Dashboard />
            </MainLayoutPage>
          }
        />

        <Route
          path="/items"
          element={
            <ProtectedRoute>
              <MainLayoutPage onLogout={handleLogout} isLogin={isLogin}>
                <Items />
              </MainLayoutPage>
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <MainLayoutPage onLogout={handleLogout} isLogin={isLogin}>
                <Order />
              </MainLayoutPage>
            </ProtectedRoute>
          }
        />
        <Route
          path="/issueitem"
          element={
            <ProtectedRoute>
              <MainLayoutPage onLogout={handleLogout} isLogin={isLogin}>
                <IssueItem />
              </MainLayoutPage>
            </ProtectedRoute>
          }
        />
        <Route
          path="/returnitem"
          element={
            <ProtectedRoute>
              <MainLayoutPage onLogout={handleLogout} isLogin={isLogin}>
                <ReturnItem />
              </MainLayoutPage>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
