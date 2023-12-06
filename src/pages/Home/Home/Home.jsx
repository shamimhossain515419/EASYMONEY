import Banner from "../../../Components/Banner/Banner";
import Client from "../../../Components/Client/Clinet";
import Complited from "../../../Components/CompiletteProject/Complited";
import Container from "../../../Components/Contaner";
import HomeBannerComponent from "../../../Components/HomeBannerComponent/HomeBannerComponent";


const Home = () => {
     return (
          <div>


               <Banner></Banner>
               <Container>

                    <div className="">

                         <HomeBannerComponent></HomeBannerComponent>
                         <Complited></Complited>

                         <Client></Client>
                    </div>
               </Container>

          </div>
     );
};

export default Home;