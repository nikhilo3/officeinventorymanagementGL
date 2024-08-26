import React, { useEffect, useState } from 'react'
import FormReturn from '../components/FormReturn';
import { api } from '../config/api';
import { Bounce, toast } from 'react-toastify';

function ReturnItem() {

  const [showPopup,setShowPopup] = useState(false)

  const [retrunItem,setreturnItem] = useState(null);

  useEffect(()=>{
    handleFetchreturnItem()
  },[])

  const handleFetchreturnItem =async ()=>{
    const {data} = await api.get('/returnitem/get');
    
    console.log(data.returnedItems);

    setreturnItem(data.returnedItems)
    
  }

  useEffect(() => {
    if (!retrunItem) {
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
  }, [retrunItem]);
  
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
              {retrunItem?.map((product, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{product._id}</td>
                  <td className="py-2 px-4 border-b">{product.departmentName}</td>
                  <td className="py-2 px-4 border-b">{product.items.map((p,i)=>{
                    return <span key={i}>
                      {p.item.productname} ({p.quantity})
                      <br/>
                    </span>
                  })}</td>
                  <td className="py-2 px-4 border-b">{new Date(product.returnDate).toLocaleString('en-US',{dateStyle:'long'})}</td>
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