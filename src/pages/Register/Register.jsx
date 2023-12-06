
import { useContext, useEffect, useState } from 'react';
import CommonTitle from '../../Components/CommenTitle/CommoentTitle';
import CommonButton from '../../Components/CommonButtons/CommonButton';
import { AuthContact } from '../../GlobalContact/GlobalConteact';

import { BeatLoader } from 'react-spinners'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom/dist';
import axios from 'axios';
const Register = () => {

     const [imageLoading, setImageLoading] = useState(false);
     const [errorFild, setErorfild] = useState(false);
     const { buttonLoading, setButtonLoading, verifyUser, updateUserProfile, createUser } = useContext(AuthContact);
     const [image, setImage] = useState("");
     const [show, setShow] = useState(false)
     const [video, setVideo] = useState([])
     const route = useNavigate();


     useEffect(() => {
          fetch('https://easymoney-server-ln6jw1lz0-shamimusman515419.vercel.app/videos').then(res => res.json().then(data => setVideo(data.slice(0, 10))));
     })
     const handleSubmit = async (e) => {
          e.preventDefault();
          const from = e.target;
          const name = from.name.value;
          const password = from.password.value;
          const confirm = from.Confirm.value;
          const email = from.email.value;
          const photo = image;
          const UserInfo = { name, password, video, email, photo, ret:20, status:'success',  level: 1, refar: 0, money: 0, number: 0, address: "", post: 0, role: "user" }
          if (password === confirm) {
               setButtonLoading(true);
               createUser(email, password).then(result => {
                    if (result) {
                         axios.post('https://easymoney-server-ln6jw1lz0-shamimusman515419.vercel.app/users', UserInfo).then(result => {
                              console.log(result);
                              if (result) {
                                   toast.success('Successfully SinIN!')
                                   route('/')
                                   setButtonLoading(false);
                              }
                         }).catch(error => {
                              toast.error(`${error?.message}`)
                         })

                    }

                    updateUserProfile(name, photo).then(result => {
                         if (result) {
                              setButtonLoading(false);
                         }
                         verifyUser();

                    })

               }).catch(error => {
                    setButtonLoading(false);
                    toast.error(`${error?.message}`)
               })


          } else {
               setErorfild(true)
          }





     }
     console.log(image);

     const handleimage = (event) => {
          const selectedImage = event.target.files[0];
          setImageLoading(true)
          const Imagebb_URL = `https://api.imgbb.com/1/upload?key=a51250151cc877a01d697ac0a493b3bd`
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
     
     return (
          <div className=''>

               <div className=" max-w-[1000px] mx-auto shadow-xl p-4 rounded-md ">
                    <div>

                         <div className=" text-center ">
                              <CommonTitle aline={'mx-auto'} title=" Register New " ></CommonTitle>
                         </div>
                         <form onSubmit={handleSubmit}>
                              <div className=" w-full    py-2">
                                   <label className=" text-xl font-semibold" htmlFor="name"> Name: </label>
                                   <input type="text" name="name" className="py-3 mt-3 px-4 block border w-full border-gray-200 rounded-md text-sm  outline-blue-500 focus:border-blue-500 focus:ring-blue-500  " placeholder="Name" />

                              </div>
                              <div className=" w-full    py-2">
                                   <label className=" text-xl font-semibold" htmlFor="name"> Email: </label>
                                   <input type="email" required name="email" className="py-3 mt-3 px-4 block border w-full border-gray-200 rounded-md text-sm  outline-blue-500 focus:border-blue-500 focus:ring-blue-500  " placeholder="email" />

                              </div>
                              <div className=" w-full    py-2">
                                   <label className=" text-xl font-semibold" htmlFor="name"> Password: </label>
                                   <input type={`${show == true ? "text" : "password"}`} required name="password" className="py-3 mt-3 px-4 block border w-full border-gray-200 rounded-md text-sm  outline-blue-500 focus:border-blue-500 focus:ring-blue-500  " placeholder=" Your  password" />
                                   {
                                        errorFild ? <> <p className=' text-red-400'> password not match </p> </> : <></>
                                   }
                              </div>
                              <div className=" w-full    py-2">
                                   <label className=" text-xl font-semibold" htmlFor="name"> Confirm Password: </label>
                                   <input type={`${show == true ? "text" : "password"}`} required name="Confirm" className="py-3 mt-3 px-4 block border w-full border-gray-200 rounded-md text-sm  outline-blue-500 focus:border-blue-500 focus:ring-blue-500  " placeholder=" Confirm  password" />
                                   {
                                        errorFild ? <> <p className=' text-red-400'> password not match </p> </> : <></>
                                   }
                              </div>
                              <div>
                                   <p onClick={() => setShow(!show)} className=' cursor-pointer  underline'>Show password</p>
                              </div>
                              <div className=" w-full    py-2">
                                   <label className=" text-xl font-semibold" htmlFor="name"> Your photo </label>
                                   {
                                        image ? <> <p className=' textColor text-xl font-light'>Success upload image</p> </> : <> {
                                             imageLoading ? <> <BeatLoader color="#000000" /></> : <>   <input onChange={handleimage} className=' block ' type="file" required /></>
                                        }</>
                                   }


                              </div>
                              <button disabled={buttonLoading} type="submit" className=" block  w-full    py-2">

                                   <CommonButton loading={buttonLoading} color={"text-white"} title={"submit"}></CommonButton>
                              </button>

                         </form>

                         <div className='text-center'>
                              <Link className=' text-xl  font-bold  underline' to={'/login'}> Login</Link>
                         </div>
                    </div>
               </div>

          </div>
     );
};

export default Register;