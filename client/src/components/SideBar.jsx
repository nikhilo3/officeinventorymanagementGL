import React from "react";
function SideBar() {
  return (
    <>
      <nav className=" rounded-md w-[20%] h-full flex-col justify-between">
        <div className=" bg-white ">
          <div className="flex  justify-center py-[1.2rem] shadow-lg pr-4">
            <div className="pl-2">
              <p className="text-2xl font-bold text-indigo-600">Inventory</p>
              <span className="text-sm block text-gray-800">Management System</span>
            </div>
          </div>
          <div className="pl-10">
            <ul className="space-y-8 pt-10">
            <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
              <img className="h-7 w-7" src="https://img.icons8.com/color/48/control-panel--v2.png" alt="package"/>
                <a href="/">Dashboard</a>
              </li>
              <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
              <img className="h-7 w-7" src="https://img.icons8.com/color/48/package.png" alt="package"/>
                <a href="/items">Items</a>
              </li>
              <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
              <img className="h-7 w-7" src="https://img.icons8.com/fluency/48/order-completed.png" alt="order-completed"/>
                <a href="/order">Orders</a>
              </li>
              <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
              <img className="h-7 w-7" src="https://img.icons8.com/emoji/48/check-mark-emoji.png" alt="check-mark-emoji"/>
                <a href="/issueitem">item Issue</a>
              </li>
              <li className="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
              <img className="h-7 w-7" src="https://img.icons8.com/external-nawicon-outline-color-nawicon/64/external-return-delivery-nawicon-outline-color-nawicon.png" alt="external-return-delivery-nawicon-outline-color-nawicon"/>
                <a href="/returnitem">Return Item</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default SideBar;
