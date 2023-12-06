

const CommonTitle = ({ title,color,aline }) => {
     return (
          <div className=" my-2">
               <div className={`  inline-block ${color} text-xl md:text-3xl font-bold uppercase leading-7`}>
                    {title}

                    <div className={` ${aline} bg-[#298742] h-[3px] w-[70%] mt-2`}> </div>
               </div>

          </div>
     );
};

export default CommonTitle;