import { useEffect, useState } from 'react';

const videoApi = () => {

     const [video, setVideo] = useState([])

     useEffect(() => {
          fetch('https://easymoney-server-ln6jw1lz0-shamimusman515419.vercel.app/videos').then(res => res.json().then(data => setVideo(data.slice(0, 10))));
     }, []);

     
     return [video]
};

export default videoApi;