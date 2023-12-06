import { Link } from 'react-router-dom';
import videoBg from '../../../public/money.mp4';
import './banner.css'
const Banner = () => {
     return (
          <div>
               <div className=" relative w-full h-[90vh]">
                    <video src={videoBg} autoPlay loop muted />
                    <div className="content flex flex-col gap-5">
                         <h1 className=' text-base md:text-4xl font-medium '>Easymoney Deposit View Ad and Earn Money
                         </h1>
                         <Link to={'/login'} className='  text-sm md:text-xl font-medium  bg-[#298742] px-4 py-2  rounded-sm '>
                         Move towards your goal
                         </Link>

                    </div>
               </div>
          </div>
     );
};

export default Banner;