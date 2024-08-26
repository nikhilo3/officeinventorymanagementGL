import React, { useEffect, useState } from "react";
import FormOrder from "../components/FormOrder";
import { api } from "../config/api";
import { Bounce, toast } from "react-toastify";

function Order() {
  const [showPopup, setShowPopup] = useState(false);

  const [order, setOrder] = useState(null);

  useEffect(() => {
    handleOrderFetch();
  }, []);

  const handleOrderFetch = async () => {
    const { data } = await api.get("/order/get");
    setOrder(data.orders);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "deliverd":
        return "text-green-500";
      case "Pending":
        return "text-yellow-500";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (!order) {
      toast.info("Loading Data 🔃!", {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        isLoading: true,
      });
    }else{
      toast.dismiss();
    }
  }, [order]);

  return (
    <>
      <div className="p-2">
        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              setShowPopup(true);
            }}
          >
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
                {order?.map((order, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{order._id}</td>
                    <td className="py-2 px-4 border-b">{order.productname}</td>
                    <td className="py-2 px-4 border-b">{order.quantity}</td>
                    <td className="py-2 px-4 border-b">{order.supplierName}</td>
                    <td className="py-2 px-4 border-b">
                      {order.orderBy.username}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {new Date(order.createdAt).toLocaleString("en-US", {
                        dateStyle: "long",
                      })}
                    </td>
                    <td
                      className={`py-2 px-4 border-b ${getStatusClass(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showPopup && <FormOrder setShowPopup={setShowPopup} handleOrderFetch={handleOrderFetch}/>}
    </>
  );
}

export default Order;
