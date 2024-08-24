import React from "react";

function Dashboard() {
  const cards = [
    {
      id: 1,
      color: "bg-blue-100",
      icon: "🤖", // Replace with actual icon
      number: "714k",
      label: "Weekly Sales",
    },
    {
      id: 2,
      color: "bg-blue-200",
      icon: "🤖", // Replace with actual icon
      number: "714k",
      label: "Weekly Sales",
    },
    {
      id: 3,
      color: "bg-yellow-100",
      icon: "🤖", // Replace with actual icon
      number: "714k",
      label: "Weekly Sales",
    },
    {
      id: 4,
      color: "bg-red-100",
      icon: "🤖", // Replace with actual icon
      number: "714k",
      label: "Weekly Sales",
    },
    {
      id: 5,
      color: "bg-red-200",
      icon: "🤖", // Replace with actual icon
      number: "714k",
      label: "Weekly Sales",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Maggi",
      alertAmount: "43",
      StockInDate: "11/12/22",
      availblity: "In-stock",
    },
    {
      id: 2,
      name: "Maggi",
      alertAmount: "43",
      StockInDate: "11/12/22",
      availblity: "In-stock",
    },
    {
      id: 3,
      name: "Maggi",
      alertAmount: "43",
      StockInDate: "11/12/22",
      availblity: "In-stock",
    },
  ];
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
              <div className="text-3xl font-bold">{card.number}</div>
              <div className="text-gray-600">{card.label}</div>
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
                    
                  >
                    <td className="py-2 px-4 border-b">{product.id}</td>
                    <td className="py-2 px-4 border-b">{product.name}</td>
                    <td className="py-2 px-4 border-b">{product.alertAmount}</td>
                    <td className="py-2 px-4 border-b">
                      {product.StockInDate}
                    </td>
                    <td
                      className={`py-2 px-4 border-b`}
                    >
                      {product.availblity}
                    </td>
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
