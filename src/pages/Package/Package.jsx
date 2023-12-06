import { useContext, useEffect, useState } from "react";
import Container from "../../Components/Contaner";
import { AuthContact } from "../../GlobalContact/GlobalConteact";

import PackageImage from '../../../public/package.avif'

import PackageComponent from "../../Components/PackageComponet/PackageComponent";
const Package = () => {
     const { user } = useContext(AuthContact)

     const [isPackage, setPackage] = useState([]);
     useEffect(() => {
          fetch('/level.json').then(res => res.json().then(data => {
               setPackage(data)
          }))
     }, [user])




     return (
          <div>

               <Container>
                    <div className=" mx-auto pb-4 relative ">
                         <img className="   relative w-full h-[40vh]  md:h-[50vh]    " src={PackageImage} alt="" />
                         <div className=" absolute  top-0 bg-[#0000004f] w-full h-full">
                              <h1 className=" p-4 md:ml-10 uppercase md:mt-10 text-2xl md:text-4xl font-bold text-white "> Deposit to earn more</h1>
                         </div>
                    </div>
                    <div className=" py-9">
                         <div className=" grid md:grid-cols-3 gap-8">
                              {
                                   isPackage?.map(item => <PackageComponent key={item?._id} item={item}></PackageComponent>)
                              }
                         </div>
                    </div>





               </Container>
          </div >
     );
};

export default Package;