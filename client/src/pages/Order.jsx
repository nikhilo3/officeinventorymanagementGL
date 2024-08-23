import React, { useState } from "react";
import FormOrder from "../components/FormOrder";

function Order() {
  const [showPopup, setShowPopup] = useState(false);

  const products = [
    {
      id: 1,
      name: "Maggi",
      quantity: "43",
      supplierName: "kiran",
      orderBy: "nikhil",
      orderDate: "11/12/22",
      orderStatus: "Pending",
    },
    {
      id: 2,
      name: "Maggi",
      quantity: "43",
      supplierName: "kiran",
      orderBy: "nikhil",
      orderDate: "11/12/22",
      orderStatus: "Deliverd",
    },
    {
      id: 3,
      name: "Maggi",
      quantity: "43",
      supplierName: "kiran",
      orderBy: "nikhil",
      orderDate: "11/12/22",
      orderStatus: "Pending",
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Deliverd":
        return "text-green-500";
      case "Pending":
        return "text-yellow-500";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="p-2">
        <div className="flex justify-end mb-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={()=>{setShowPopup(true)}}>
            New Order
          </button>
        </div>
        <div className="bg-white shadow-md rounded-lg">
          <div className="overflow-y-auto h-full">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">id</th>
                  <th className="py-2 px-4 border-b text-left">Item Name</th>
                  <th className="py-2 px-4 border-b text-left">Quantity</th>
                  <th className="py-2 px-4 border-b text-left">supplierName</th>
                  <th className="py-2 px-4 border-b text-left">OrderBy</th>
                  <th className="py-2 px-4 border-b text-left">Order Date</th>
                  <th className="py-2 px-4 border-b text-left">order Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{product.id}</td>
                    <td className="py-2 px-4 border-b">{product.name}</td>
                    <td className="py-2 px-4 border-b">{product.quantity}</td>
                    <td className="py-2 px-4 border-b">
                      {product.supplierName}
                    </td>
                    <td className="py-2 px-4 border-b">{product.orderBy}</td>
                    <td className="py-2 px-4 border-b">{product.orderDate}</td>
                    <td
                      className={`py-2 px-4 border-b ${getStatusClass(
                        product.orderStatus
                      )}`}
                    >
                      {product.orderStatus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showPopup && <FormOrder setShowPopup={setShowPopup} />}
    </>
  );
}

export default Order;
