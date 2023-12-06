

import { Outlet } from 'react-router-dom'

import Navbar from '../Share/Navbar/Navbar';
import Footer from '../Share/Footer/Footer';
import  { Toaster } from 'react-hot-toast';
// import LocalHost from './Localhost';

const Main = () => {

     return (
          <div>

               <Navbar></Navbar>
               <div className=" mt-20  min-h-[70vh]">
                    <div><Outlet></Outlet></div>
               </div>
               <Footer></Footer>
               <Toaster
                    position="top-center"
                    reverseOrder={false}
               />
               {/* <LocalHost></LocalHost> */}
          </div>
     );
};

export default Main;