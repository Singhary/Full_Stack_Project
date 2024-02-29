import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom" ;
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
import BookingDates from "../BookingDates";

export default function BookingPage(){
    
    const{id}=useParams() ;
    const [booking,setBooking] = useState(null) ;
     
    useEffect(()=>{
        if(id){
            axios.get('/bookings').then((response)=>{
              const foundBooking = response.data.find(({_id}) => _id === id);

              if(foundBooking){
                setBooking(foundBooking) ;
              }
            });
        }
    },[id])
    
    if(!booking){
        return '' ;
    }


    return(
        <div>
            <h1 className="text-3xl">{booking.place.title}</h1>
        <AddressLink place={booking.place}/>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your booking information:</h2>
          {console.log({booking})}
          <BookingDates bookings={booking} />
        </div>
        <button className="bg-primary p-6 text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-3xl">${booking.price}</div>
        </button>
      </div>
      <PlaceGallery place={booking.place} />
        </div>
    )
}