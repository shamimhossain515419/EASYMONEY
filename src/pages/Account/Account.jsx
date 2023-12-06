import { useContext, useState } from "react";
import Container from "../../Components/Contaner";
import { AuthContact } from "../../GlobalContact/GlobalConteact";
import UserApi from "../../Api/UserApi";
import useAxiosSecure from "../../Components/AsioxSecures/useAxiosSecure";
import toast from "react-hot-toast";
import CopyToClipboard from "react-copy-to-clipboard";
import { FcMoneyTransfer } from 'react-icons/fc';
import { BeatLoader } from 'react-spinners'
import { useNavigate } from "react-router-dom";
const Account = () => {
     const { user, userInfo, setUserInfo } = useContext(AuthContact);
     const [axiosSecure] = useAxiosSecure();
     const [userData, refetch, isLoading] = UserApi(user?.email);
     const [number, setNumber] = useState(0);
     const [value, setValue] = useState('https://easymoney-13e05.firebaseapp.com');
     const [copied, setCopied] = useState(false);
     const [address, setAddress] = useState("");
     const [image, setImage] = useState("");
     const [imageLoading, setImageLoading] = useState(false);
     const userUpdate = { number: number, address: address }
     const navigate = useNavigate();
     const handleCopy = () => {
          setCopied(true);
     };
     const handleSubmit = () => {
          axiosSecure.put(`/user/update?email=${user?.email}`, userUpdate).then(result => {
               if (result) {
                    toast.success(" successfully update ")
                    refetch();
               }

          }).catch(error => {
               toast.error(error.massage)
          })
     }

     const handleimage = (event) => {
          const selectedImage = event.target.files[0];
          setImageLoading(true)
          const Imagebb_URL = `https://api.imgbb.com/1/upload?key=2554066fa2423b9f3c4479f66dfaae6d`
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
     const ReferData = { email: user?.email, image };
     console.log(image);
     const NewData = { refar: userData?.refar + 40 };
     console.log(NewData);
     console.log(ReferData);
     const HandleRefer = () => {
          axiosSecure.put(`/user/update?email=${user?.email}`, NewData).then(result => {
               if (result) {
                    axiosSecure.post('/refer', ReferData).then(result => {
                         if (result) {
                              toast.success("successfully Refer  Give 20BD !! ")
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
               <Container>
                    <div className="  py-7">
                         <div className="  gap-3">
                              <h1 className=" text-xl font-medium">Name: {user?.displayName} </h1>
                              <h1 className=" text-sm md:text-xl font-medium">Email: {user?.email} </h1>
                              <div className=" flex items-center  gap-4 text-xl font-medium">Number: {userData?.number ? <div>{userData?.number}</div> : <div className=" flex items-center  gap-3"> <input onChange={(e) => setNumber(e.target?.value)} className="py-2 mt-3 px-4 block border w-full border-gray-200 rounded-md text-sm  outline-blue-500 focus:border-blue-500 focus:ring-blue-500  " type="number" name="" id="add number" placeholder=" add number" />
                                   <button className=" bgColor text-white px-2 py-[2px]" onClick={handleSubmit}>Submit</button>
                              </div>} </div>
                              <div className=" flex items-center  gap-4 text-xl font-medium">Address: {userData?.address ? <div>{userData?.address}</div> : <div className=" flex items-center  gap-3"> <input onChange={(e) => setAddress(e.target?.value)} className="py-2 mt-3 px-4 block border w-full border-gray-200 rounded-md text-sm  outline-blue-500 focus:border-blue-500 focus:ring-blue-500  " type="text" name="" id="add number" placeholder=" add address" />
                                   <button className=" bgColor text-white px-2 py-[2px]" onClick={handleSubmit}>Submit</button>
                              </div>} </div>


                         </div>
                         <h2 className=" text-xl font-semibold my-2  textColor py-0  capitalize "> Level - {userData?.level} </h2>
                         <hr className=" bg-black h-[2px] my-5" />
                         <div className=" grid sm:grid-cols-2 md:grid-cols-3 gap-3">

                              <div className="  text-center px-4 py-2 rounded-lg  bg-[#c52d9365]">
                                   <div className=" text-center">
                                        <FcMoneyTransfer className=" text-center mx-auto" size={38}></FcMoneyTransfer>
                                        <h2 className=" text-2xl font-semibold my-2 ">  Earn:  {userData?.money ? userData?.money : " 00.00 "} ৳ </h2>
                                   </div>

                              </div>
                              <div className="  text-center px-4 py-2 rounded-lg  bg-[#29874289]">
                                   <div className=" text-center">
                                        <FcMoneyTransfer className=" text-center mx-auto" size={38}></FcMoneyTransfer>
                                        <h2 className=" text-xl font-semibold my-2 ">  Refer:  {userData?.refar ? userData?.refar : " 00.00 "} ৳ </h2>
                                   </div>

                              </div>
                              <div className="  text-center px-4 py-2 rounded-lg  bg-[#c52d9365]">
                                   <div className=" text-center">
                                        <FcMoneyTransfer className=" text-center mx-auto" size={38}></FcMoneyTransfer>
                                        <h2 className=" text-xl font-semibold my-2 ">  Total Earn:  {userData?.money || userData?.refar ? userData?.money + userData?.refar : " 00.00 "} ৳ </h2>
                                   </div>

                              </div>
                         </div>


                         <div className="   grid md:grid-cols-2 gap-4  py-4">
                              <div>
                                   <div className=" mt-4">
                                        <h1> Refer Link: https://easymoney-13e05.firebaseapp.com/</h1>

                                        <div>
                                             {copied ? <span className=" bgColor text-white px-2 py-[2px] text-xl font-xl" style={{ color: 'red' }}>Copied</span> : <CopyToClipboard text={value} onCopy={handleCopy}>
                                                  <button className=" bgColor text-white px-2 py-[2px] text-xl font-xl">Copy  </button>
                                             </CopyToClipboard>}
                                        </div>
                                   </div>
                              </div>
                              <div className=" mt-2">
                                   <h1 className=" my-2"> Please Refer screen sort upload</h1>
                                   <div>
                                        {
                                             image ? <> <p className=' textColor text-xl font-light'>Success upload image</p> </> : <> {
                                                  imageLoading ? <> <BeatLoader color="#298742" /></> : <>   <input onChange={handleimage} className=' block ' type="file" required /></>
                                             }</>
                                        }
                                   </div>
                                   <button disabled={!image} onClick={HandleRefer} className=" mt-4 px-4 py-[3px] text-white bgColor">Submit</button>

                              </div>
                         </div>
                    </div>
               </Container>
          </div>
     );
};

export default Account;