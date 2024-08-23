import React from "react";
function SideBar() {
  return (
    <>
      <nav class=" rounded-md w-[20%] h-full flex-col justify-between">
        <div class=" bg-white ">
          <div class="flex  justify-center py-[1.2rem] shadow-lg pr-4">
            <div class="pl-2">
              <p class="text-2xl font-bold text-indigo-600">Inventory</p>
              <span class="text-sm block text-gray-800">Management System</span>
            </div>
          </div>
          <div class="pl-10">
            <ul class="space-y-8 pt-10">
            <li class="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
              <img className="h-7 w-7" src="https://img.icons8.com/color/48/control-panel--v2.png" alt="package"/>
                <a href="/">Dashboard</a>
              </li>
              <li class="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
              <img className="h-7 w-7" src="https://img.icons8.com/color/48/package.png" alt="package"/>
                <a href="/items">Items</a>
              </li>
              <li class="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
              <img className="h-7 w-7" src="https://img.icons8.com/fluency/48/order-completed.png" alt="order-completed"/>
                <a href="/order">Orders</a>
              </li>
              <li class="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
              <img className="h-7 w-7" src="https://img.icons8.com/emoji/48/check-mark-emoji.png" alt="check-mark-emoji"/>
                <a href="/issueitem">item Issue</a>
              </li>
              <li class="flex space-x-4 items-center hover:text-indigo-600 cursor-pointer">
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
