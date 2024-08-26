import React, { useEffect, useState } from "react";
import PopupFormItem from "../components/PopupFormItem";
import { api } from "../config/api";
import { Bounce, toast, ToastContainer } from "react-toastify";
import EditFormItem from "../components/EditFormItem";
import IssueItemForm from "../components/IssueItemForm";

function Items() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isSelected, setIsSelected] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  const [items, setItems] = useState(null);

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [showIssueForm, setShowIssueForm] = useState(false);

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

  const handleDeleteItem = async (itemid) => {
    console.log("handle item called");
    console.log("handle item calledwith id", itemid);

    try {
      const response = await api.delete(`/product/remove/${itemid}`);
      if (response.status === 200) {
        toast.success("Item deleted Success!", {
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
        handleItemFetch();
      }
    } catch (error) {
      console.log("error while delete item", error);
    }
  };

  useEffect(() => {
    if (!items) {
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
  }, [items]);

  console.log("selectedProducts =", selectedProducts);

  return (
    <>
      <div className="p-2">
        <div className="flex justify-end mb-4">
          {isSelected && (
            <button
              className="bg-blue-500 mr-4 text-white px-4 py-2 rounded"
              onClick={() => {
                setShowIssueForm(true);
              }}
            >
              Issue Items
            </button>
          )}

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
            <table
              className={`min-w-full ${
                selectedProducts.length === items?.length && items?.length > 0
                  ? "bg-gray-100"
                  : ""
              }`}
            >
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
                          setIsSelected(true);
                        } else {
                          setSelectedProducts([]);
                          setIsSelected(false);
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
                  <th className="py-2 px-4 border-b text-left"></th>
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
                        onChange={(e) => {
                          handleCheckboxChange(item);
                          if (e.target.checked) {
                            setIsSelected(true);
                          } else {
                            setIsSelected(false);
                          }
                        }}
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
                    <td className="py-2 px-4 border-b">
                      <button
                        className="bg-transparent border-none p-0 shadow-none"
                        onClick={() => {
                          handleDeleteItem(item._id);
                        }}
                      >
                        <img
                          className="h-6 w-6"
                          src="https://img.icons8.com/color/48/delete-forever.png"
                          alt="delete-forever"
                        />
                      </button>
                      <button
                        className="ml-2 bg-transparent border-none p-0 shadow-none"
                        onClick={() => {
                          setEditItem(item);
                          setShowEditPopup(true);
                        }}
                      >
                        <img
                          className="h-6 w-6"
                          src="https://img.icons8.com/color/48/edit--v1.png"
                          alt="edit"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showPopup && (
        <PopupFormItem
          setpopup={setShowPopup}
          handleItemFetch={handleItemFetch}
        />
      )}

      {showEditPopup && (
        <EditFormItem
          item={editItem}
          setShowEditPopup={setShowEditPopup}
          handleItemFetch={handleItemFetch}
        />
      )}

      {showIssueForm && (
        <IssueItemForm
          selectedProducts={selectedProducts}
          setShowIssueForm={setShowIssueForm}
          handleItemFetch={handleItemFetch}
        />
      )}
    </>
  );
}

export default Items;
