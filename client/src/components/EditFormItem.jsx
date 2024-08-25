import { useState } from "react";
import { api } from "../config/api";
import { Bounce, toast } from "react-toastify";

function EditFormItem({ item, setShowEditPopup, handleItemFetch }) {
  const [formData, setFormData] = useState({
    productname: item.productname,
    quantity: item.quantity,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/product/update/${item._id}`, formData);
      toast.success("Item updated successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
      handleItemFetch();
      setShowEditPopup(false);
    } catch (error) {
      toast.error("Failed to update item.", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-[200] h-screen">
      <div className="bg-white p-8 rounded shadow-md w-1/3">
        <h2 className="text-xl font-semibold mb-4">Edit Item</h2>
        <form onSubmit={handleUpdateItem}>
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
          <div className="flex justify-end">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => setShowEditPopup(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditFormItem;