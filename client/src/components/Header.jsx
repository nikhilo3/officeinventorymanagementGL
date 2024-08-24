import React from "react";
import { useNavigate } from "react-router";

function Header({ onLogout, isLogin }) {
  console.log("header isLogin:", isLogin);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex header h-[89.39px]">
        <div className="w-full flex justify-end items-center innerheader">
          <div className="flex flex-nowrap justify-end">
            <div className="relative flex items-center ml-8 mr-10">
              <span className="absolute ml-4  -translate-y-1/2 top-1/2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  ></path>
                </svg>
              </span>
              <input
                className="block w-full min-w-[70px] py-3 pl-12 pr-4 text-base font-medium leading-normal bg-white border border-solid outline-none text-stone-500 border-stone-200 bg-clip-padding rounded-2xl"
                placeholder="Search..."
                type="text"
              />
            </div>

            {isLogin && (
              <div className="relative flex items-center ml-4 mr-8">
                <div className="profilecontainer flex flex-col justify-center items-center">
                  <img
                    width="40"
                    height="40"
                    src="https://img.icons8.com/3d-fluency/94/user-male-circle.png"
                    alt="user-male-circle"
                  />
                  <span className=" font-bold mt-1">Nikhil Ladani</span>
                </div>
                <a
                  href="#"
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-500"
                  onClick={() => {
                    onLogout();
                    navigate("/login");
                  }}
                >
                  Logout
                </a>
              </div>
            )}

            {!isLogin && (
              <div className="items-center text-lg flex mr-8">
                <a
                  href="/login"
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-600 hover:bg-gray-500"
                >
                  Sign in
                </a>
                <a
                  href="/registration"
                  className="ml-6 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-500"
                >
                  Sign up
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
