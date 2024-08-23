import React from "react";
import ggsvg from "../assets/images/gg.svg";

function Registration() {
  return (
    <>
      <style>
        {`
          .form-control{
            padding:8px;
            background-color:#EDF0F2;
            border:1px solid #ADADAD;
            border-radius:8px;
          }
        `}
      </style>
      <div className="main bg-white h-screen overflow-hidden">
        <div className="inner grid grid-cols-2 h-full">
          <div className="right p-12 flex items-center justify-center">
            <img src={ggsvg} alt="SVG Icon" className="" />
          </div>

          <div className="left mt-12 flex flex-col">
            <h1 className="text-2xl font-bold mb-12">Register</h1>
            <div className="flex flex-col mb-8">
              <span className="font-semibold">Manage Inventory</span>
              <span>
                Lorem, ipsum dolor sit amet conseccing elit. Corrupti obcaecati
                ab nostrum accusantium aut quasi ut, optio nam.
              </span>
            </div>

            <div className="form">
              <form action="">
                <div className="inputfeilds grid grid-cols-2 gap-3 mr-10 gap-x-7">
                  <div className="form-group flex flex-col">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      required
                    />
                  </div>

                  <div className="form-group flex flex-col">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Phone Number"
                      required
                      onInput={(e) => {
                        if (e.target.value.length > 10) {
                          e.target.value = e.target.value.slice(0, 10);
                        }
                      }}
                    />
                  </div>

                  <div className="form-group flex flex-col">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      required
                    />
                  </div>

                  <div className="form-group flex flex-col">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
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
                  <span>I agree to all terms, Privacy policie</span>
                </div>

                <div className="btn mt-6">
                  <button className="btn bg-indigo-600 px-9  hover:bg-indigo-500 transition-all">
                    Register
                  </button>
                </div>

                <div className="already mt-6">
                  <p className="text-gray-500">Already have an account?  <a href="#" className="text-blue-800">Login</a> </p> 
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;
