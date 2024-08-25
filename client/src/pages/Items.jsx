import React, { useEffect, useState } from "react";
import PopupFormItem from "../components/PopupFormItem";
import { api } from "../config/api";

function Items() {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [showPopup, setShowPopup] = useState(false);

  const [items, setItems] = useState(null);

  useEffect(() => {
    handleItemFetch();
  }, []);

  const handleItemFetch = async () => {
    const { data } = await api.get("/product/get");

    setItems(data.products);
  };

  const handleAvailability = (item) => {
    if (item.quantity === 0) {
      return "Out of stock";
    } else if (item.quantity <= 10) {
      return "Low stock";
    } else {
      return "In-stock";
    }
  };

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
      prevSelected.some((p) => p._id === product._id)
        ? prevSelected.filter((p) => p._id !== product._id)
        : [
            ...prevSelected,
            {
              _id: product._id,
              productname: product.productname,
              quantity: product.quantity,
            },
          ]
    );
  };

  console.log(selectedProducts);

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
                            items?.map((p) => {
                              return {
                                id: p._id,
                                name: p.productname,
                                quantity: p.quantity,
                              };
                            })
                          );
                        } else {
                          setSelectedProducts([]);
                        }
                      }}
                      checked={
                        selectedProducts.length === items?.length &&
                        items?.length > 0
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
                {items?.map((item, index) => (
                  <tr
                    key={index}
                    className={
                      selectedProducts.some((p) => p._id === item._id)
                        ? "bg-gray-100"
                        : ""
                    }
                  >
                    <td className="py-2 px-4 border-b">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        onChange={() => handleCheckboxChange(item)}
                        checked={selectedProducts.some(
                          (p) => p._id === item._id
                        )}
                      />
                    </td>
                    <td className="py-2 px-4 border-b">{item._id}</td>
                    <td className="py-2 px-4 border-b">{item.productname}</td>
                    <td className="py-2 px-4 border-b">{item.quantity}</td>
                    <td className="py-2 px-4 border-b">
                      {new Date(item.createdAt).toLocaleString("en-US", {
                        dateStyle: "long",
                      })}
                    </td>
                    <td
                      className={`py-2 px-4 border-b ${getStatusClass(
                        handleAvailability(item)
                      )}`}
                    >
                      {handleAvailability(item)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showPopup && <PopupFormItem setpopup={setShowPopup} handleItemFetch={handleItemFetch}/>}
    </>
  );
}

export default Items;
