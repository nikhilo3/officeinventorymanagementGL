import React, { useState } from "react";
import PopupFormItem from "../components/PopupFormItem";

function Items() {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [showPopup, setShowPopup] = useState(false);

  const products = [
    {
      id: 1,
      name: "Maggi",
      quantity: "43",
      StockInDate: "11/12/22",
      availblity: "In-stock",
    },
    {
      id: 2,
      name: "Maggi",
      quantity: "43",
      StockInDate: "11/12/22",
      availblity: "In-stock",
    },
    {
      id: 3,
      name: "Maggi",
      quantity: "43",
      StockInDate: "11/12/22",
      availblity: "In-stock",
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "In-stock":
        return "text-green-500";
      case "Out of stock":
        return "text-red-500";
      case "Low stock":
        return "text-yellow-500";
      default:
        return "";
    }
  };

  const handleCheckboxChange = (product) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.some((p) => p.id === product.id)
        ? prevSelected.filter((p) => p.id !== product.id)
        : [
            ...prevSelected,
            { id: product.id, name: product.name, quantity: product.quantity },
          ]
    );
  };

  console.log(selectedProducts);

  return (
    <>
      <div className="p-2">
        <div className="flex justify-end mb-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={()=>{setShowPopup(true)}}>
            Add Items
          </button>
        </div>
        <div className="bg-white shadow-md rounded-lg">
          <div className="overflow-y-auto h-full">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedProducts(
                            products.map((p) => {
                              return {
                                id: p.id,
                                name: p.name,
                                quantity: p.quantity,
                              };
                            })
                          );
                        } else {
                          setSelectedProducts([]);
                        }
                      }}
                      checked={
                        selectedProducts.length === products.length &&
                        products.length > 0
                      }
                    />
                  </th>
                  <th className="py-2 px-4 border-b text-left">id</th>
                  <th className="py-2 px-4 border-b text-left">Items Name</th>
                  <th className="py-2 px-4 border-b text-left">Quantity</th>
                  <th className="py-2 px-4 border-b text-left">
                    Stock In Date
                  </th>
                  <th className="py-2 px-4 border-b text-left">Availability</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={index}
                    className={
                      selectedProducts.some((p) => p.id === product.id)
                        ? "bg-gray-100"
                        : ""
                    }
                  >
                    <td className="py-2 px-4 border-b">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onChange={() => handleCheckboxChange(product)}
                        checked={selectedProducts.some(
                          (p) => p.id === product.id
                        )}
                      />
                    </td>
                    <td className="py-2 px-4 border-b">{product.id}</td>
                    <td className="py-2 px-4 border-b">{product.name}</td>
                    <td className="py-2 px-4 border-b">{product.quantity}</td>
                    <td className="py-2 px-4 border-b">
                      {product.StockInDate}
                    </td>
                    <td
                      className={`py-2 px-4 border-b ${getStatusClass(
                        product.availblity
                      )}`}
                    >
                      {product.availblity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showPopup && <PopupFormItem setpopup={setShowPopup}/>}
    </>
  );
}

export default Items;
