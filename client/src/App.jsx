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

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        <Route path="/" element={<MainLayoutPage><Dashboard/></MainLayoutPage>} />
        <Route path="/items" element={<MainLayoutPage><Items/></MainLayoutPage>} />
        <Route path="/order" element={<MainLayoutPage><Order/></MainLayoutPage>} />
        <Route path="/issueitem" element={<MainLayoutPage><IssueItem/></MainLayoutPage>} />
        <Route path="/returnitem" element={<MainLayoutPage><ReturnItem/></MainLayoutPage>} />
      </Routes>
    </>
  );
}

export default App;
