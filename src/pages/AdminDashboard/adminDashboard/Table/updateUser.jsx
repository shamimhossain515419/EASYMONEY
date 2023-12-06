import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../Components/AsioxSecures/useAxiosSecure";



const UpdateUser = ({ showModal, setShowModal, SingleUser }) => {

     console.log(SingleUser);
     const [money, setMoney] = useState("");
     const [ret, setRet] = useState("");
     const [level, setLevel] = useState("");
     const [axiosSecure] = useAxiosSecure();
     const newData = { money, ret, level }


     const handleUpdate = () => {
         axiosSecure.put(`/user/update?email=${SingleUser?.email}`, newData).then(result => {
               if (result) {
                    toast.success("successfully update")
                    setShowModal(false)
               }
          }).catch(error => {
               toast.error(error.message)
          })

     }

     return (
          <div>
               {showModal ? (
                    <>
                         <div
                              className="justify-center items-center mt-10 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                         >
                              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                   {/*content*/}
                                   <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#F5F5F5] outline-none focus:outline-none">
                                        {/*header*/}
                                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                             <h3 className="text-3xl font-semibold">
                                                  {SingleUser?.name}
                                             </h3>
                                             <button
                                                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                  onClick={() => setShowModal(false)}
                                             >
                                                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                       ×
                                                  </span>
                                             </button>
                                        </div>
                                        {/*body*/}
                                        <div className="relative p-6 flex-auto">

                                             <div className=" w-full    py-2">
                                                  <label className=" text-xl font-semibold" htmlFor="name"> money: </label>
                                                  <input defaultValue={SingleUser?.money} onChange={(e) => setMoney(e.target.value)} type="number" name="money" className="py-3 mt-3 px-4 block border w-full border-gray-200 rounded-md text-sm  outline-blue-500 focus:border-blue-500 focus:ring-blue-500  " placeholder="Money" />
                                             </div>
                                             <div className=" w-full    py-2">
                                                  <label className=" text-xl font-semibold" htmlFor="name"> level: </label>
                                                  <select className="py-3 mt-3 px-4 block border w-full border-gray-200 rounded-md text-sm  outline-blue-500 focus:border-blue-500 focus:ring-blue-500  " defaultValue={SingleUser?.level} onChange={(e) => setLevel(e.target.value)}>
                                                       <option value={1}>1</option>
                                                       <option value={2}>2</option>
                                                       <option value={3}>3</option>
                                                       <option value={4}>4</option>
                                                       <option value={5}>5</option>
                                                       <option value={6}>6</option>
                                                  </select>

                                             </div>
                                             <div className=" w-full    py-2">
                                                  <label className=" text-xl font-semibold" htmlFor="name"> ret: </label>
                                                  <input defaultValue={SingleUser?.ret} onChange={(e) => setRet(e.target.value)} type="number" name="ret" className="py-3 mt-3 px-4 block border w-full border-gray-200 rounded-md text-sm  outline-blue-500 focus:border-blue-500 focus:ring-blue-500  " placeholder="level" />
                                             </div>

                                        </div>
                                        {/*footer*/}
                                        <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                                             <button
                                                  className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                  type="button"
                                                  onClick={() => setShowModal(false)}
                                             >
                                                  Close
                                             </button>
                                             <button
                                                  className="bgColor text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                  type="button"
                                                  onClick={handleUpdate}
                                             >
                                                  Submit
                                             </button>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
               ) : null}
          </div>
     );
};

export default UpdateUser;