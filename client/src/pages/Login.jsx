import React, { useState } from "react";
import ggsvg from "../assets/images/gg.svg";
import { useNavigate } from "react-router";
import { api } from "../config/api";

function Login(props) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegi = (e) => {
    e.preventDefault();
    handleApi(formData);
  };

  const handleApi = async (data) => {
    console.log("Registration form Data=", data);

    try {
      const response = await api.post("/user/login", JSON.stringify(data));
      console.log("registration responce=", response.data);

      if (response.status === 200) {
        console.log("Registration successful, calling onlogin");
        props.onlogin(response.data); // Ensure this sets the login state correctly
        console.log("onlogin called, navigating to home");
        navigate("/"); // Navigate to home page after successful registration
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        if (error.response.data.message === "user not found") {
          alert("user not found");
        } else {
          alert("form submission failed");
        }
      }
    }
  };
  return (
    <>
      <style>
        {`
          .form-control{
            padding:8px;
            background-color:#EDF0F2;
            border:1px solid #ADADAD;
            border-radius:8px;
            width:21rem
          }
        `}
      </style>
      <div className="main bg-white h-screen overflow-hidden">
        <div className="inner grid grid-cols-2 h-full">
          <div className="right p-12 flex items-center justify-center">
            <img src={ggsvg} alt="SVG Icon" className="" />
          </div>

          <div className="left mt-12 flex flex-col">
            <h1 className="text-2xl font-bold mb-12">Login</h1>
            <div className="flex flex-col mb-8">
              <span className="font-semibold">Manage Inventory</span>
              <span>
                Lorem, ipsum dolor sit amet conseccing elit. Corrupti obcaecati
                ab nostrum accusantium aut quasi ut, optio nam.
              </span>
            </div>

            <div className="form">
              <form onSubmit={handleRegi}>
                <div className="inputfeilds grid grid-cols-1 gap-3 mr-10 gap-x-7">
                  <div className="form-group flex flex-col">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      onChange={handleInputChange}
                      value={formData.email}
                      required
                    />
                  </div>

                  <div className="form-group flex flex-col">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      onChange={handleInputChange}
                      value={formData.password}
                      required
                    />
                  </div>
                </div>

                <div className="confirm mt-8 mb-4">
                  <input
                    type="checkbox"
                    className="checkbox mr-3"
                    style={{ backgroundColor: "white" }}
                    required
                  />
                  <span>Remember me</span>
                  <a href="#" className="ml-20 text-blue-800">
                    Forgot Password?
                  </a>
                </div>

                <div className="btn mt-4">
                  <button
                    type="submit"
                    className="btn bg-indigo-600 px-9 hover:bg-indigo-500 transition-all"
                  >
                    Login
                  </button>
                </div>

                <div className="already mt-6">
                  <p className="text-gray-500">
                    Not Registred Yet?{" "}
                    <a href="/registration" className="text-blue-800">
                      create a new account
                    </a>{" "}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
