import { useContext, useEffect, useState } from "react";
import CommonTitle from "../../Components/CommenTitle/CommoentTitle";
import CommonButton from "../../Components/CommonButtons/CommonButton";

import { AuthContact } from "../../GlobalContact/GlobalConteact";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom/dist";
import { FcGoogle } from 'react-icons/fc'
import axios from "axios";

const Login = () => {
     const { buttonLoading, GoogleLogin, Login } = useContext(AuthContact);
     const Navigate = useNavigate();
     const [video, setVideo] = useState([])

     useEffect(() => {
          fetch('https://easymoney-server-ln6jw1lz0-shamimusman515419.vercel.app/videos').then(res => res.json().then(data => setVideo(data.slice(0, 10))));
     })

     const handleSubmit = async (e) => {
          e.preventDefault();
          const from = e.target;
          const email = from.email.value;
          const password = from.password.value;
          Login(email, password).then(result => {
               if (result) {
                    toast.success(" successfully Login")
                    Navigate('/')
               }
          }).then(error => {
               if (error) {
                    toast.success(error?.massage)

               }
          })
     }

     const handleGoogle = () => {
          GoogleLogin().then(result => {
               const user = result?.user;
               if (user) {
                    const UserInfo = {video, name: user?.displayName, password: "", ret:20, status:'success', level:1, refar: 0, email: user?.email, photo: user?.photoURL, money: 0, number: 0, address: "", post: 0, role: "user" }
                    axios.post('https://easymoney-server-ln6jw1lz0-shamimusman515419.vercel.app/users', UserInfo).then(result => {
                         console.log(result);
                         if (result) {
                              toast.success(" successfully Login")
                              Navigate('/')

                         }
                    }).catch(error => {
                         toast.error(`${error?.message}`)
                    })

               }

          }).catch(error => {
               toast.error(`${error?.message}`)
          })
     }

     return (
          <div className=" mt-20 shadow-xl mx-auto  w-full md:w-[800px]    ">

               <div className="  mx-auto  w-full p-4">
                    <div>

                         <div className=" text-center ">
                              <CommonTitle aline={'mx-auto'} title="Login Your account " ></CommonTitle>
                         </div>
                         <form onSubmit={handleSubmit}>
                              <div className=" w-full    py-2">
                                   <label className=" text-xl font-semibold" htmlFor="name"> Email: </label>
                                   <input type="email" name="email" className="py-3 mt-3 px-4 block border w-full border-gray-200 rounded-md text-sm  outline-blue-500 focus:border-blue-500 focus:ring-blue-500  " placeholder="Email" />

                              </div>
                              <div className=" w-full    py-2">
                                   <label className=" text-xl font-semibold" htmlFor="name"> Password: </label>
                                   <input type="password" name="password" className="py-3 mt-3 px-4 block border w-full border-gray-200 rounded-md text-sm  outline-blue-500 focus:border-blue-500 focus:ring-blue-500  " placeholder="password" />

                              </div>
                              <button disabled={buttonLoading} type="submit" className=" block  w-full    py-2">

                                   <CommonButton loading={buttonLoading} color={"text-white"} title={"submit"}></CommonButton>
                              </button>

                         </form>
                         <div onClick={handleGoogle} className=" bg-black cursor-pointer shadow-xl px-2 text-center py-2   my-3">
                              <FcGoogle className="  block text-center mx-auto" size={24}></FcGoogle>
                         </div>
                         <div>
                              <Link to={'/register'} className=" text-center underline block text-xl  font-medium my-2 ">Register</Link>
                         </div>
                    </div>
               </div>
               <Toaster
                    position="top-center"
                    reverseOrder={false}
               />
          </div>
     );
};

export default Login;