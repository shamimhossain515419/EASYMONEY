
import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ReactStars from 'react-stars'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import CommonTitle from "../CommenTitle/CommoentTitle";

const Client = () => {
     const [clint, setClint] = useState([]);
     useEffect(() => {
          fetch('client.json').then(res => res.json()).then(data => {
               setClint(data);
          })
     }, [])

   

     
     return (
          <div className=" block mt-10">

               <div className=" text-center">
                    <CommonTitle color={"#000000"} aline={"mx-auto"} title={"User Feedback"}></CommonTitle>
               </div>


               <div>
                    <Swiper
                         spaceBetween={30}
                         centeredSlides={true}
                         slidesPerView={1}
                         loop={true}
                         breakpoints={{
                              sm: {
                                   slidesPerView: 1,
                                   spaceBetween: 8,
                              },
                              md: {
                                   slidesPerView: 2,
                                   spaceBetween: 12,
                              },
                              lg: {
                                   slidesPerView: 2,
                                   spaceBetween: 16,
                              },
                              xl: {
                                   slidesPerView: 2,
                                   spaceBetween: 20,
                              },
                              // You can add more breakpoints as needed
                         }} 
                         autoplay={{
                              delay: 2500,
                              disableOnInteraction: false,
                         }}


                         navigation={true}
                         modules={[Autoplay, Pagination, Navigation]}
                         className="mySwiper  max-w-[1200px] md:px-10"
                    >
                         {
                              clint && clint?.map(item =>

                                   <SwiperSlide key={item.id} className='  px-2 mt-7'>
                                        <div className=' flex justify-center items-center flex-col gap-2'>
                                             <div>
                                                  <ReactStars
                                                       value={5}
                                                       count={5}
                                                       size={24}
                                                       color2={'#FACA51'} />
                                             </div>

                                             <h1 className=' text-xl  max-w-[600px] text-center  mx-auto font-normal my-2'> {item?.feedback }</h1>
                                             <p className=' my-2'> Easy money Best Site</p>
                                             <div className=' bgColcr h-[1px] w-[200px]'></div>
                                             <div className=' flex items-center my-4  gap-4'>
                                                  <img className=' w-16 h-16 rounded-full  border border-blue-400   object-cover ' src={item.img} alt="" />
                                                  <h1 className=' text-xl  font-normal '> {item?.name} </h1>
                                             </div>
                                        </div>
                                   </SwiperSlide>



                              )
                         }



                    </Swiper>
               </div>

          </div>
     );
};

export default Client;