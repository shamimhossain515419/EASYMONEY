

import { FaBars } from 'react-icons/fa';

import { useContext, useEffect, useState } from 'react';
import { AiOutlineLogout, AiOutlineClose } from 'react-icons/ai'
import logo from '../../../public/logo (1) (1).png'
import Container from '../../Components/Contaner';
import Manubar from './Manubar';
import { Link } from 'react-router-dom';
import { AuthContact } from '../../GlobalContact/GlobalConteact';
import toast from 'react-hot-toast'

const Navbar = () => {
     const [Open, setOpen] = useState(true);
     const [openModal, setOpenModal] = useState(false)
     const { LogOut, user } = useContext(AuthContact);
     const [admin, setAdmin] = useState(false);
     const [account, setAccount] = useState({});


     const heandleLogout = () => {
          LogOut().then((result) => {
               console.log(result);
               setOpenModal(false)
               toast.success("Successfully Logout")
          }).catch((error) => {
               console.log(error);
               toast.error(error?.massage)
          });
     }

     const token = localStorage.getItem('access-token');
     useEffect(() => {
          fetch(`https://easymoney-server-ln6jw1lz0-shamimusman515419.vercel.app/user?email=${user?.email}`, {
               method: "GET",
               headers: {
                    Authorization: `Bearer ${token}`
               }
          }).then(res => res.json().then(data => setAccount(data)))
     }, [user])


     console.log(account);

     return (
          <nav className='px-2 w-full fixed py-3 z-50 bg-white      top-0  left-0 right-0    shadow-lg'>
               <Container>
                    <div className=' '>
                         <div className=' flex justify-between items-center'>
                              <div className=' flex  items-center gap-4'>
                                   <img src={logo} className=' h-12 hidden md:block ' alt="" />
                                   <Link to={'/dashboard'}>  <img className=" h-12 w-12 md:hidden rounded-full object-cover" src={user?.photoURL} alt="" /></Link>
                                   <Link to="/"> <h1 className='  py-2 font-semibold  text-2xl text-color   uppercase'> EasyMoney </h1></Link>
                              </div>
                              <div className=' hidden md:flex items-center gap-3  space-x-5'>
                                   {
                                        admin ? <>  <Link to={'/dashboard/admin'}>All user</Link>
                                             <Link to={'/dashboard/payment'}> Payment</Link>
                                             <div onClick={() => setAdmin(false)} className=' cursor-pointer' >Client view</div>
                                        </> : <><Link to={'/dashboard'}> Dashboard</Link>
                                             <Link to={'/package'}>Package</Link>
                                             <Link to={'/dashboard/account'}> Account</Link>
                                             <Link to={'/FAQ'}> FAQ</Link>
                                             <Link to={'/contact'}> Contact Us</Link>
                                             {account?.role == "admin" ? <div onClick={() => setAdmin(true)} className=' cursor-pointer' >Admin view</div> : null
                                             }

                                        </>

                                   }

                                   <div>
                                        {
                                             user ? <div onClick={() => setOpenModal(!openModal)} className=' cursor-pointer hidden md:block '>
                                                  <div className='   relative flex gap-2 items-center '>
                                                       <img className=' relative h-10 w-10 rounded-full object-cover' src={user?.photoURL} alt="" />
                                                       <div className=' absolute w-3 h-3  left-8 -top-1  bg-[rgb(1,179,31)] rounded-full '></div>
                                                       <div className=' relative  space-y-0'>
                                                            <h1 className='relative  text-base'>{user?.displayName}</h1>
                                                            <span className=' absolute -bottom-3 text-xs mt-4'> Active now</span>
                                                       </div>

                                                  </div>
                                             </div> : <Link to={'/login'} className={'text-[#298742]'}> Login/Register</Link>
                                        }
                                   </div>

                              </div>

                              <div className={`bg-[#298742c2]  text-white   ${openModal ? "transform translate-x-0" : "transform translate-x-full"}  duration-300 sm:w-[250px]  h-screen p-4 rounded-lg shadow-lg   absolute top-0  right-1`}>
                                   <div className=' flex flex-col gap-4 mt-4  '>
                                        <Link onClick={() => setOpenModal(false)} to={'/dashboard'} className={"text-xl hover:text-black duration-150  font-medium"}> Dashboard</Link>
                                        <Link onClick={() => setOpenModal(false)} to={'/dashboard/account'} className={"text-xl   hover:text-black duration-150   font-medium"}>profile</Link>
                                        <div onClick={heandleLogout} className=' flex items-center gap-2  cursor-pointer  hover:text-black duration-150  text-xl  font-medium'>  <AiOutlineLogout size={20}></AiOutlineLogout>  <span>Logout</span>  </div>
                                   </div>
                                   <AiOutlineClose onClick={() => setOpenModal(false)} size={24} className={" cursor-pointer absolute top-2 right-1 "}></AiOutlineClose>
                              </div>



                              <div onClick={() => setOpen(!Open)} className=' md:hidden '>

                                   {
                                        Open ? <FaBars size={24} className=' '> </FaBars> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>

                                   }

                              </div>
                         </div>

                         <div className='  md:hidden'>
                              {
                                   Open ? "" : <Manubar account={account} admin={admin} setAdmin={setAdmin} setOpen={setOpen}></Manubar>
                              }
                         </div>


                    </div>
               </Container>

          </nav>
     );
};

export default Navbar;