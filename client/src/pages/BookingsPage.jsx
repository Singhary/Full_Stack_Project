import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";

export default function BookingsPage(){

  const[bookings , setBookings] = useState([]);
  
  useEffect(()=>{
    axios.get('/bookings').then((response)=>{
         setBookings(response.data);
    });
  },[])

  return(
      <div>
        <AccountNav/>
          <div>
            {bookings?.length>0 && bookings.map(bookings=>(
              <div className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
                <div className="w-48">
                  <PlaceImg place={bookings.place}/>
                </div>
                <div className="py-3">
                   <h2 className="text-xl">{bookings.place.title}</h2>
                     {bookings.checkIn}
                </div>  
              </div>
            ))}

          </div>
      </div>
    )
}