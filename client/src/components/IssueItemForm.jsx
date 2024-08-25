import React, { useState } from "react";
import { Bounce, toast } from "react-toastify";
import { api } from "../config/api";

function IssueItemForm({ selectedProducts, setShowIssueForm,handleItemFetch }) {
  const [departmentName, setDepartmentName] = useState("");
  const [quantities, setQuantities] = useState(
    selectedProducts.reduce((acc, product) => {
      acc[product._id] = 1; // Default quantity
      return acc;
    }, {})
  );

  const handleQuantityChange = (itemId, value) => {
    setQuantities((prev) => ({ ...prev, [itemId]: value }));
    console.log(quantities);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Form Submitted with Quantities:", quantities);
      const itemsToIssue = selectedProducts.map((product) => ({
        itemid: product._id,
        quantity: quantities[product._id],
      }));
      console.log("itemsToIssue", itemsToIssue);
      const response = await api.post(
        "/issueitem",
        JSON.stringify({ departmentName, items: itemsToIssue })
      );
      if (response.status === 201) {
        toast.success("Items issued successfully!", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        setShowIssueForm(false);
        handleItemFetch();
      }
    } catch (error) {
      console.log("error while issuing items", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-[200] h-screen">
      <div className="bg-white p-4 rounded-lg shadow-md w-1/3">
        <h2 className="text-xl font-semibold mb-4">Issue Items</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Department Name
            </label>
            <input
              type="text"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              className="border px-3 py-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Quantities</label>
            {selectedProducts.map((product) => (
              <div key={product._id} className="flex items-center mb-2">
                <span className="mr-2">{product.productname}:</span>
                <input
                  type="number"
                  min="1"
                  value={quantities[product._id] || 1}
                  onChange={(e) =>
                    handleQuantityChange(product._id, e.target.value)
                  }
                  className="border px-3 py-2 w-24 rounded"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowIssueForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Issue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default IssueItemForm;
