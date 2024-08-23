import React, { useState } from 'react'
import FormReturn from '../components/FormReturn';

function ReturnItem() {

  const [showPopup,setShowPopup] = useState(false)

  const products = [
    {
      id: 1,
      departmentname: "Maggi",
      orderDate: "11/12/22",
      reason:'meri marji..',
      items: [
        {
          itemname: "iphone",
          quantity: 55,
        },
        {
          itemname: "hshdf",
          quantity: 22,
        },
      ],
    },
    {
      id: 2,
      departmentname: "Maggi",
      orderDate: "11/12/22",
      reason:'meri marji..',
      items: [
        {
          itemname: "iphone",
          quantity: 55,
        },
        {
          itemname: "hshdf",
          quantity: 22,
        },
      ],
    },
    {
      id: 3,
      departmentname: "Maggi",
      orderDate: "11/12/22",
      reason:'meri marji..',
      items: [
        {
          itemname: "iphone",
          quantity: 55,
        },
        {
          itemname: "hshdf",
          quantity: 22,
        },
      ],
    },
  ];
  return (
    <>
    <div className="p-2">
      <div className="flex justify-end mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={()=>{setShowPopup(true)}}> 
          return Item
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg">
        <div className="overflow-y-auto h-full">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">id</th>
                <th className="py-2 px-4 border-b text-left">
                  Department Name
                </th>
                <th className="py-2 px-4 border-b text-left">
                  ItemsName,Qunatity
                </th>
                <th className="py-2 px-4 border-b text-left">Return Date</th>
                <th className="py-2 px-4 border-b text-left">Reason</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{product.id}</td>
                  <td className="py-2 px-4 border-b">{product.departmentname}</td>
                  <td className="py-2 px-4 border-b">{product.items.map((p,i)=>{
                    return <span key={i}>
                      {p.itemname} ({p.quantity})
                      <br/>
                    </span>
                  })}</td>
                  <td className="py-2 px-4 border-b">{product.orderDate}</td>
                  <td className="py-2 px-4 border-b">{product.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    {showPopup && <FormReturn setShowPopup={setShowPopup}/>}
    </>

  )
}

export default ReturnItem