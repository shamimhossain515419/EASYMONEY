import { useContext, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { BeatLoader } from 'react-spinners'
import useAxiosSecure from "../AsioxSecures/useAxiosSecure";
import { AuthContact } from "../../GlobalContact/GlobalConteact";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PackageComponent = ({ item }) => {
     const [imageLoading, setImageLoading] = useState(false);
     const { user } = useContext(AuthContact)
     const [image, setImage] = useState("");
     const [showModal, setShowModal] = useState(false);
     const [value, setValue] = useState('+8801617650797');
     const [copied, setCopied] = useState(false);
     const [axiosSecure] = useAxiosSecure();
     const handleCopy = () => {
          setCopied(true);
     };
     const navigate = useNavigate();
     const handleimage = (event) => {
          const selectedImage = event.target.files[0];
          setImageLoading(true)
          const Imagebb_URL = `https://api.imgbb.com/1/upload?key=22ed14c930e2dd03f17b9e05c5eba1e6`
          const formData = new FormData();
          formData.append('image', selectedImage);
          fetch(Imagebb_URL, {
               method: "POST",
               body: formData
          }).then(res => res.json()).then(data => {
               if (data?.data?.display_url) {

                    setImage(data?.data?.display_url)
                    setImageLoading(false)
               }
          })
     }

     const handleSubmit = () => {


          const paymentData = { taka:item?.deposited,  name: user?.displayName, email: user?.email, image, date: new Date() };

          const NewData = { level: item?.name, ret: item?.money, status: 'pending' };
          console.log(NewData);
          console.log(paymentData);

          axiosSecure.put(`/user/update?email=${user?.email}`, NewData).then(result => {
               if (result) {
                    axiosSecure.post('/payment', paymentData).then(result => {
                         if (result) {
                              toast.success("successfully payment  thanks !!")
                              setShowModal(false)
                              navigate('/dashboard')
                         }
                    }).catch(error => {
                         toast.error(error.message)
                         console.log(error);
                    })
               }

          }).catch(error => {
               toast.error(error.message)
          })


     }

     return (
          <div>

               <div className="" >
                    <div onClick={() => setShowModal(true)} className=" cursor-pointer">
                         <div className="relative card ">
                              <img className=" relative  h-[300px] w-full" src={item?.img} alt="" />
                              <div className=" flex items-center  text-center  text-white justify-center  gap-1 flex-col absolute top-0 right-0 hover:bg-[#3a0d38b9]  bg-[#3a0d3875] w-full h-full">
                                   <h1 className=" text-2xl md:text-4xl font-bold  text-[#fff]"> Level-{item?.name} </h1>
                                   <h1 className=" text-xl  md:text-2xl font-medium "> Deposit= {item?.deposited} </h1>
                                   <h1 className=" text-xl  md:text-2xl font-medium "> 1 Day Earn = {item?.day} </h1>
                                   <h1 className=" text-lg  md:text-xl font-medium ">  {item?.description} </h1>
                                   <button className="bgColor px-4 py-[4px] font-bold text-xl uppercase">{item?.deposited == "00" ? <>Free</> : <> Buy Package</>}</button>
                              </div>
                         </div>
                         <div>
                         </div>  </div>

               </div>

               {showModal ? (
                    <>
                         <div
                              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                         >
                              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                   {/*content*/}
                                   <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        {/*header*/}
                                        <div className="flex items-start justify-between flex-wrap p-5 border-b border-solid border-slate-200 rounded-t">
                                             <h3 className="text-3xl font-semibold">
                                                  Level - {item?.name}
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
                                        <div className="relative p-6 ">
                                             <p className="my-4 text-black text-xl font-medium  leading-relaxed">
                                                  Send  Submit the screen short by sending {item?.deposited} taka to the number below.
                                             </p>
                                             <div className="  gap-4 items-center ">
                                                  <h1 className=" text-black text-xl  font-semibold"> Bkash:  +8801617650797 </h1>
                                                  <div className=" mt-4">


                                                       {copied ? <span className=" bgColor text-white px-2 py-[2px] text-xl font-xl" style={{ color: 'red' }}>Copied</span> : <CopyToClipboard text={value} onCopy={handleCopy}>
                                                            <button className=" bgColor text-white px-2 py-[2px] text-xl font-xl">Copy  </button>
                                                       </CopyToClipboard>}
                                                  </div>
                                             </div>


                                             <div>
                                                  <h1 className=" text-xl font-normal my-3"> Upload payment  success  screen sort  </h1>
                                                  {
                                                       image ? <> <p className=' textColor text-xl font-light'>Success upload image</p> </> : <> {
                                                            imageLoading ? <> <BeatLoader color="#000000" /></> : <>   <input onChange={handleimage} className=' block ' type="file" required /></>
                                                       }</>
                                                  }
                                             </div>

                                        </div>
                                        {/*footer*/}
                                        <div className="  p-6 border-t border-solid border-slate-200 rounded-b">
                                             <button
                                                  className="bg-red-500 text-white  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                  type="button"
                                                  onClick={() => setShowModal(false)}
                                             >
                                                  Close
                                             </button>
                                             <button
                                                  className="bgColor text-white  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                  type="button"
                                                  disabled={!image}
                                                  onClick={handleSubmit}
                                             >
                                                  Submit
                                             </button>
                                        </div>
                                   </div>
                              </div>
                         </div>

                    </>
               ) : null}
          </div>
     );
};

export default PackageComponent;