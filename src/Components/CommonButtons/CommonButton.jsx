
import {BeatLoader} from 'react-spinners'
const CommonButton = ({ title, color, loading }) => {
     return (
          <div className="py-1">
               <div className={` ${color} capitalize  text-center text-sm md:text-xl font-medium   bg-[#298742] px-4 py-2  rounded-sm `}>
                    {
                         loading ? <> <BeatLoader color="#fff" /></> : <> {title}</>
                    }


               </div>
          </div>
     );
};

export default CommonButton; 