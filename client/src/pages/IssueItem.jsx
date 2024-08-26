import React, { useEffect, useState } from "react";
import { api } from "../config/api";
import { Bounce, toast } from "react-toastify";

function IssueItem() {

  const [issueItem,setIssueItem] = useState(null);

  useEffect(()=>{
    handleFetchIssueItem()
  },[])

  const handleFetchIssueItem =async ()=>{
    const {data} = await api.get('/issueitem/get');

    setIssueItem(data.getissueitem)
    
  }

  useEffect(() => {
    if (!issueItem) {
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
  }, [issueItem]);

  return (
    <div className="p-2">
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
                      {p.itemid ? p.itemid?.productname:"Removed"} ({p.quantity})
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
