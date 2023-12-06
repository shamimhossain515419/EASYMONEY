import { useContext, useEffect, useState,  } from 'react';
import { AuthContact } from '../GlobalContact/GlobalConteact';

import useAxiosSecure from '../Components/AsioxSecures/useAxiosSecure';

import moment from 'moment/moment';




function LocalHost({ userData, refetch }) {
     const { user } = useContext(AuthContact);
     const [axiosSecure] = useAxiosSecure();
     const [video, setVideo] = useState([])

     useEffect(() => {
          fetch('https://easymoney-server-ln6jw1lz0-shamimusman515419.vercel.app/videos').then(res => res.json().then(data => setVideo(data.slice(0, 10))));
     }, [user]);


     // console.log(newData);
     useEffect(() => {
          // Calculate the time until the next update (12 AM)
          const now = new Date();
          const updateHour = 0;
          const updateMinute = 0;
          const updateDate = new Date(
               now.getFullYear(),
               now.getMonth(),
               now.getDate(),
               updateHour,
               updateMinute,
               0
          );

          console.log(now);
          console.log(updateDate);
          console.log(moment(now).format("h:mm:ss a"));
          console.log(moment(userData?.date).format("MMM Do YY"));
          if (moment(now).format("h:mm:ss a") !== moment(userData?.date).format("MMM Do YY")) {
               console.log("hsmim");
          } else {
               console.log("adfgdf");
          }

          if (now > updateDate && video.length > 1 && moment(userData?.date).format("MMM Do YY" ) !== moment(now).format("MMM Do YY")) {
               axiosSecure.put(`/user/update?email=${user?.email}`, { ...userData, video: video, date: new Date(), }).then(result => {
                    if (result) {
                     console.log("success");
                     refetch();
                    }

               }).catch(error => {
                    console.log(error);
               })

               updateDate.setDate(updateDate.getDate() + 1);
          }

          const timeUntilUpdate = updateDate - now;

          const updateTimeout = setTimeout(() => {
               // When the scheduled time arrives, update localStorage again

          }, timeUntilUpdate);

          return () => {
               // Clean up the timeout when the component unmounts
               clearTimeout(updateTimeout);
          };
     }, [user,video]);


     return (
          <div className="App">
               {/* Your component JSX */}
          </div>
     );
}

export default LocalHost;
