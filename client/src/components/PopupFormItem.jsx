import React, { useEffect, useState } from "react";
import { api } from "../config/api";
import { Bounce, toast } from "react-toastify";

function PopupFormItem({ setpopup ,handleItemFetch}) {
  const [formData, setFormData] = useState({
    productname: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/product/add", JSON.stringify(formData));
      toast.success("Item Added Successfully!", {
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
      console.log("item added", response);
      setpopup(false);
      handleItemFetch();
    } catch (error) {
      console.log('faild to add product',error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-[200] h-screen">
      <div className="bg-white p-8 rounded shadow-md w-1/3">
        <h2 className="text-xl font-semibold mb-4">New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Product Name</label>
            <input
              type="text"
              name="productname"
              onChange={handleChange}
              value={formData.productname}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              onChange={handleChange}
              value={formData.quantity}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="flex justify-end">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => setpopup(false)}
            >
              Discard
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopupFormItem;
