import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContact } from "../../GlobalContact/GlobalConteact";


const Manubar = ({ setOpen, setAdmin, admin, account }) => {
     const { user } = useContext(AuthContact)
     return (
          <div>
               <hr />
               <div className=' space-y-3 flex   flex-col '>
                    {
                         admin ? <>  <Link onClick={() => setOpen(true)} to={'/dashboard/admin'}>All user</Link>
                              <Link onClick={() => setOpen(true)} to={'/dashboard/payment'}> Payment</Link>
                              <div onClick={() => setAdmin(false)} className=' cursor-pointer' >Client view</div>
                         </> : <><Link onClick={() => setOpen(true)} to={'/dashboard'}> dashboard</Link>
                              <Link onClick={() => setOpen(true)} to={'/package'}>Package</Link>
                              <Link onClick={() => setOpen(true)} to={'/Testimonials'}> Testimonials</Link>
                              <Link onClick={() => setOpen(true)} to={'/FAQ'}> FAQ</Link>
                              <Link onClick={() => setOpen(true)} to={'/contact'}> Contact Us</Link>
                              {account?.role == "admin" ? <div onClick={() => { setAdmin(true)}} className=' cursor-pointer' >Admin view</div> : null
                              }

                         </>

                    }
                    <div className="  flex items-center gap-1">
                         <img className=" h-12 w-12 rounded-full object-cover" src={user?.photoURL} alt="" />
                         <p> {user?.displayName} </p>
                    </div>
               </div>
          </div>
     );
};

export default Manubar;