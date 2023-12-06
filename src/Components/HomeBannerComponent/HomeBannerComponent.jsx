
import image1 from '../../../src/assets/1_f990a381-7b4e-4a43-b312-77668c9f760e-min.webp'
import image2 from '../../../src/assets/Copy_of_IG_Fall_2020_Shopify-_used_in_Collection_pages_1_080f4427-9e1a-41d3-a3c2-033d596aaf68.webp'
import CommonTitle from '../CommenTitle/CommoentTitle';

const HomeBannerComponent = () => {
     return (
          <div>


               <div className=' text-center py-5'>
                    <CommonTitle aline={'mx-auto'} color={"#000000"} title={"Learn more about us"}></CommonTitle>
               </div>
               <div className=' my-7'>
                    <div className=' md:grid md:grid-cols-2  gap-10 items-center  '>
                         <div className=' h-[400px] overflow-hidden relative cursor-pointer '>
                              <img className=' relative transform duration-300   hover:scale-110  h-full w-full object-cover ' src={image1} alt="" />
                              <div className=' w-full h-full bg-[#0b0b0b82] absolute top-0 flex items-center  justify-center'>
                                   <CommonTitle aline={"mx-auto"} color={"text-[#fff]"} title={"Investment"}></CommonTitle>
                              </div>
                         </div>
                         <div className=' h-[400px] relative  overflow-hidden cursor-pointer'>
                              <img className=' relative  transform duration-300   hover:scale-110  h-full  w-full object-cover' src={image2} alt="" />
                              <div className=' w-full h-full bg-[#0b0b0b82] absolute top-0 flex items-center  justify-center'>
                                   <CommonTitle aline={"mx-auto"} color={"text-[#fff]"} title={"Entrepreneurship"}></CommonTitle>
                              </div>
                         </div>
                    </div>

               </div>
          </div>
     );
};

export default HomeBannerComponent;