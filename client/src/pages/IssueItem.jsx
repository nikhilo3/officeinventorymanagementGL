import React, { useEffect, useState } from "react";
import { api } from "../config/api";

function IssueItem() {

  const [issueItem,setIssueItem] = useState(null);

  useEffect(()=>{
    handleFetchIssueItem()
  },[])

  const handleFetchIssueItem =async ()=>{
    const {data} = await api.get('/issueitem/get');

    setIssueItem(data.getissueitem)
    
  }

  return (
    <div className="p-2">
      <div className="flex justify-end mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          New Issue
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
                <th className="py-2 px-4 border-b text-left">Issue Date</th>
              </tr>
            </thead>
            <tbody>
              {issueItem?.map((product, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{product._id}</td>
                  <td className="py-2 px-4 border-b">{product.departmentName}</td>
                  <td className="py-2 px-4 border-b">{product.items.map((p,i)=>{
                    return <span key={i}>
                      {p.itemid.productname} ({p.quantity})
                      <br/>
                    </span>
                  })}</td>
                  <td className="py-2 px-4 border-b">{new Date(product.createdAt).toLocaleString('en-US',{dateStyle:'long'})}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default IssueItem;
