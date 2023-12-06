

const Container = ({children}) => {
     return (
          <div className='   max-w-[2400] 2xl:px-32 xl:px-24 md:px-16 px-3'>
              <div className=" md:mx-20"> 
              {children}  
              </div>
          </div>
     );
};

export default Container;