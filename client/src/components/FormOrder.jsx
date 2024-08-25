import React, { useState } from "react";
import { api } from "../config/api";
import "react-toastify/dist/ReactToastify.css";
import { toast, Bounce } from "react-toastify";

function FormOrder({ setShowPopup, handleOrderFetch }) {
  const [formData, setFormData] = useState({
    productname: "",
    supplierName: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/order/create",
        JSON.stringify(formData)
      );
      toast.success("Order created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      console.log("order added", response);
      setShowPopup(false);
      handleOrderFetch();
    } catch (error) {
      console.log("error while creating order");
      toast.error("Failed to create order. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-[200] h-screen">
      <div className="bg-white p-8 rounded shadow-md w-1/3">
        <h2 className="text-xl font-semibold mb-4">New Order</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Product Name</label>
            <input
              type="text"
              name="productname"
              className="w-full px-3 py-2 border rounded"
              value={formData.productname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              className="w-full px-3 py-2 border rounded"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">SupplierName</label>
            <input
              type="text"
              name="supplierName"
              className="w-full px-3 py-2 border rounded"
              value={formData.supplierName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => setShowPopup(false)}
            >
              Discard
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleOrder}
            >
              New Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormOrder;
