import { MdWorkspacesFilled } from 'react-icons/md';
import { FcMoneyTransfer } from 'react-icons/fc';
import { PiStarHalf } from 'react-icons/pi';
import { HiOutlineUserGroup } from 'react-icons/hi';
import './Completed.css'
import ScrollTrigger from 'react-scroll-trigger';

import CountUp from 'react-countup';
import { useState } from 'react';
import Container from '../Contaner';
const Complited = () => {

     const [startCount,setSrartCount]=useState(false)
     return (
          <div className=" Completed md:h-[50vh] py-10">

               <Container>

                    <ScrollTrigger onEnter={()=>setSrartCount(true)} onExit={()=>setSrartCount(false)}>
                         <div className=' md:h-[40vh]  grid md:grid-cols-3 gap-4 text-white items-center'>
                              <div className=' my-2 text-center'>
                                   <FcMoneyTransfer className=' block mx-auto' size={90}></FcMoneyTransfer>
                                   <div className=' text-4xl font-bold'>
                                        {
                                             startCount && <CountUp end={10000000} duration={5} delay={0} /> 
                                         } ৳
                                     </div>
                                   <h1 className=' text-3xl font-medium'>Earn money </h1>
                              </div>
                              <div className=' my-2 text-center'>
                                   <MdWorkspacesFilled className=' block mx-auto' size={90}></MdWorkspacesFilled>
                                   <div className=' text-4xl font-bold'>
                                        {
                                             startCount && <CountUp end={1000} duration={5} delay={0} /> 
                                         }+
                                     </div>
                                   
                                   <h1 className=' text-3xl font-medium'> Jobs</h1>
                              </div>
                          
                              <div className='my-2  text-center'>
                                   <div className='  p-2 rounded-full'>
                                        <HiOutlineUserGroup className=' block mx-auto' size={80}></HiOutlineUserGroup>
                                   </div>
                                   <div className=' text-4xl font-bold'>
                                        {
                                             startCount && <CountUp end={4} duration={5} delay={0} /> 
                                         } M+
                                     </div>
                                   <h1 className=' text-3xl font-medium'> Users</h1>
                              </div>


                         </div>

                    </ScrollTrigger>

               </Container>

          </div>
     );
};

export default Complited;