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

  useEffect(() => {
    const userIsLogin = localStorage.getItem("isLogin");
    if (userIsLogin === "true") {
      setIsLogin(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLogin(true);
    localStorage.setItem("isLogin", "true");
  };

  const handleLogout = () => {
    setIsLogin(false);
    localStorage.setItem("isLogin", "false");
  };

  console.log('app is login',isLogin);
  

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
            <ProtectedRoute isLogin={isLogin}>
              <MainLayoutPage onLogout={handleLogout} isLogin={isLogin}>
                <Items />
              </MainLayoutPage>
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute isLogin={isLogin}>
              <MainLayoutPage onLogout={handleLogout} isLogin={isLogin}>
                <Order />
              </MainLayoutPage>
            </ProtectedRoute>
          }
        />
        <Route
          path="/issueitem"
          element={
            <ProtectedRoute isLogin={isLogin}>
              <MainLayoutPage onLogout={handleLogout} isLogin={isLogin}>
                <IssueItem />
              </MainLayoutPage>
            </ProtectedRoute>
          }
        />
        <Route
          path="/returnitem"
          element={
            <ProtectedRoute isLogin={isLogin}>
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
