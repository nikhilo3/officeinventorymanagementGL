import React, { useEffect, useState } from "react";
import { api } from "../config/api";

function Dashboard() {
  const [inventoryItems, setInventoryitems] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [issueItems, setIssueItems] = useState(0);
  const [returnItems, setReturnItems] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    handlefetchproduct();
  }, []);

  useEffect(() => {
    handleinventory();
    handleQuantity();
    handleissue();
    handleorder();
    handlereturn();
  }, []);

  const handleinventory = async () => {
    try {
      const { data } = await api.get("/report/inventoryitems");
      setInventoryitems(data.totalProduct);
    } catch (error) {
      console.log("error while fetching inventoryitems");
    }
  };

  const handleQuantity = async () => {
    try {
      const { data } = await api.get("/report/totalquantity");
      setTotalQuantity(data.total);
    } catch (error) {
      console.log("error while fetching inventoryitems");
    }
  };

  const handleissue = async () => {
    try {
      const { data } = await api.get("/report/issueitems");
      setIssueItems(data.totalIssueItem);
    } catch (error) {
      console.log("error while fetching inventoryitems");
    }
  };

  const handlereturn = async () => {
    try {
      const { data } = await api.get("/report/returnitems");
      setReturnItems(data.totalReturnItem);
    } catch (error) {
      console.log("error while fetching inventoryitems");
    }
  };

  const handleorder = async () => {
    try {
      const { data } = await api.get("/report/totalorder");
      setTotalOrder(data.totalOrder);
    } catch (error) {
      console.log("error while fetching inventoryitems");
    }
  };

  const cards = [
    {
      id: 1,
      color: "bg-blue-100",
      icon: "🤖", // Replace with actual icon
      name: "Total Products",
      count: inventoryItems,
    },
    {
      id: 2,
      color: "bg-blue-200",
      icon: "🤖", // Replace with actual icon
      name: "Total Quantity",
      count: totalQuantity,
    },
    {
      id: 3,
      color: "bg-yellow-100",
      icon: "🤖", // Replace with actual icon
      name: "Total Issues",
      count: issueItems,
    },
    {
      id: 4,
      color: "bg-red-100",
      icon: "🤖", // Replace with actual icon
      name: "Total Returns",
      count: returnItems,
    },
    {
      id: 5,
      color: "bg-red-200",
      icon: "🤖", // Replace with actual icon
      name: "Total Order",
      count: totalOrder,
    },
  ];

  const handlefetchproduct = async () => {
    try {
      const { data } = await api.get("/product/get");
      handleItemsAmount(data);
    } catch (error) {
      console.log("error while fetching Product in Dashboard", error);
    }
  };

  const handleItemsAmount = (data) => {

    if (data.products) {
      const filterdItems = data.products.filter((item, index) => {
        return item.quantity <= 10;
      });
      setProduct(filterdItems);
    }
  };

  return (
    <>
      <div className="p-6 bg-white">
        <h1 className="text-2xl font-bold mb-4">Hi, Welcome back</h1>
        <div className="flex gap-4 w-full justify-between flex-wrap">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`flex flex-col items-center justify-center w-[14rem] h-[12rem] p-4 rounded-lg ${card.color}`}
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <div className="text-xl font-semibold">{card.name}</div>
              <div className="text-gray-600 font-bold mt-2 text-2xl">
                {card.count}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 bg-white shadow-md rounded-lg">
        <div className="overflow-y-auto h-full">
          <div className="head mb-2 border-b-4 border-cyan-700">
            <p className="text-xl font-bold">Stock Alert</p>
          </div>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">id</th>
                <th className="py-2 px-4 border-b text-left">Items Name</th>
                <th className="py-2 px-4 border-b text-left">AlertAmount</th>
                <th className="py-2 px-4 border-b text-left">Stock In Date</th>
                <th className="py-2 px-4 border-b text-left">Availability</th>
              </tr>
            </thead>
            <tbody>
              {product?.map((product, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{product._id}</td>
                  <td className="py-2 px-4 border-b">{product.productname}</td>
                  <td className="py-2 px-4 border-b">{product.quantity}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(product.createdAt).toLocaleString("en-US", {
                      dateStyle: "long",
                    })}
                  </td>
                  <td className="py-2 px-4 border-b text-red-700">Low Stock</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
