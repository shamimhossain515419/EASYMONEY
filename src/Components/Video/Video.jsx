
import { Link } from "react-router-dom";

const Video = ({ userInfo }) => {

     return (
          <div>
               <div >
                    <div className=" grid md:grid-cols-2 gap-5">

                         {userInfo?.video?.map(item => <div className=" h-[350px]  relative" key={item?._id}>
                              <video controls muted loop className=" relative w-full">   <source src={item?.video} type="video/mp4"></source> </video>
                              <div className={` bg-[#96256f]  absolute flex  items-center justify-center z-40 top-0  w-full h-full `}>
                                   <Link to={`/video/${item?._id}`} className=" cursor-pointer bgColor text-2xl font-semibold my-2  px-3 py-2 rounded-md"> Play video</Link>
                              </div>
                         </div>)}
                    </div>

               </div>
          </div>
     );
};

export default Video;