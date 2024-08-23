import React, { useState } from "react";

function FormReturn({ setShowPopup }) {
  const [formData, setFormData] = useState({
    departmentName: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = (e) => {
    e.preventDefault();
    console.log("order added", formData);
    setShowPopup(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-[200] h-screen">
      <div className="bg-white p-8 rounded shadow-md w-1/3">
        <h2 className="text-xl font-semibold mb-4">Return</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">DepartmentName</label>
            <input
              type="text"
              name="departmentName"
              className="w-full px-3 py-2 border rounded"
              value={formData.productname}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Reason</label>
            <input
              type="text"
              name="reason"
              className="w-full px-3 py-2 border rounded"
              value={formData.quantity}
              onChange={handleChange}
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
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormReturn;
