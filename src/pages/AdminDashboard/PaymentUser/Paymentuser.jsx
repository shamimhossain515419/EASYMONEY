import moment from "moment/moment";
import getAllPayment from "../../../Api/usepymentApi";
import Container from "../../../Components/Contaner";

const PaymentUser = () => {

     const [paymentData, refetch, isLoading] = getAllPayment();

     console.log(paymentData);
     return (
          <div>
               <Container>
                    <div>

                         {
                              paymentData?.length > 1 ? <>
                                   <div className="  grid md:grid-cols-4 gap-10   ">

                                        {
                                             paymentData?.map(({ name, date, _id, image, email }) =>
                                                  <div key={_id}>

                                                       <div className=" w-full rounded overflow-hidden shadow-lg">
                                                            <img className="w-full h-[250px]" src={image} alt="Mountain" />
                                                            <div className="px-6 py-4">
                                                                 <div className="font-bold text-xl mb-2">{name}</div>
                                                                 <p className="text-gray-700 text-base">
                                                                      Email:   {email}
                                                                 </p>
                                                                 <p className="text-gray-700 text-base">
                                                                      Time: {moment(date).format('LLLL')}
                                                                 </p>
                                                            </div>
                                                            <div className="px-6 pt-4 pb-2">
                                                                 <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                                                 <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                                                 <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                                                            </div>
                                                       </div>



                                                  </div>)
                                        }
                                   </div>

                              </> : <p className=" flex items-center justify-center gap-2 h-[50vh]"> loading ....</p>
                         }

                    </div>
               </Container>
          </div>
     );
};

export default PaymentUser;