import React, { useState, useEffect } from "react";
import { api } from "../config/api";
import { toast, Bounce } from "react-toastify";

function FormReturn({ setShowPopup,handleFetchreturnItem }) {
  const [products, setProducts] = useState([]);

  const [departmentName, setDepartmentName] = useState("");
  const [reason, setReason] = useState("");

  const [selectedItems, setSelectedItems] = useState([
    { item: "", quantity: "" },
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/product/get");
        setProducts(data.products);
      } catch (error) {
        toast.error("Error fetching products", {
          transition: Bounce,
          theme: "dark",
        });
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedItems = [...selectedItems];
    updatedItems[index][name] = value;
    setSelectedItems(updatedItems);
  };

  const handleAddItem = () => {
    setSelectedItems([...selectedItems, { item: "", quantity: "" }]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...selectedItems];
    updatedItems.splice(index, 1);
    setSelectedItems(updatedItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!departmentName || !reason) {
      toast.error("Please fill out all fields", {
        transition: Bounce,
        theme: "dark",
      });
      return;
    }

    for (let item of selectedItems) {
      if (!item.item || !item.quantity || item.quantity <= 0) {
        toast.error("Please select valid products and enter quantities", {
          transition: Bounce,
          theme: "dark",
        });
        return;
      }
    }

    // Prepare the data structure for submission
    const returnData = {
      departmentName,
      reason,
      items: selectedItems.map((item) => ({
        item: item.item,
        quantity: parseInt(item.quantity, 10),
      })),
    };

    try {
      await api.post("/returnitem", returnData);
      toast.success("Items returned successfully", {
        transition: Bounce,
        theme: "dark",
      });
      setShowPopup(false);
      handleFetchreturnItem();
    } catch (error) {
      toast.error("Error returning items", {
        transition: Bounce,
        theme: "dark",
      });
    }
  };

  console.log(selectedItems);

  return (
    <>
 
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-[200] overflow-hidden">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 max-h-[90%] overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">Return Items</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Department Name
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Reason</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            {selectedItems.map((item, index) => (
              <div key={index} className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Select Product
                </label>
                <select
                  className="w-full p-2 border rounded mb-2"
                  value={item.item}
                  name="item"
                  onChange={(e) => {
                    handleInputChange(e, index);
                  }}
                >
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.productname}
                    </option>
                  ))}
                </select>
                <label className="block text-sm font-medium mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => {
                    handleInputChange(e, index);
                  }}
                />
                {selectedItems.length > 1 && (
                  <button
                    type="button"
                    className="text-red-500 mt-2"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="text-blue-500 mb-4"
              onClick={handleAddItem}
            >
              + Add another product
            </button>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default FormReturn;
