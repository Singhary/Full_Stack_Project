import { useState } from "react";
import { differenceInCalendarDays} from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function BookingWidget({place}){
  
  const[checkIn,setCheckIn] = useState('');
  const[checkOut,setCheckOut] = useState('');
  const[numberOfGuests , setNumberOfGuests] = useState(1) ;
  const[name , setName] = useState("");
  const[phone ,setPhone] = useState('') ;
  const[redirect , setRedirect] = useState('') ;
   
  let numberOfNight = 0 ;
  if(checkIn &&checkOut){
    numberOfNight = differenceInCalendarDays(new Date(checkOut) , new Date(checkIn))
  }

  async function bookThisPlace(){
    
    const response =await axios.post('/bookings',{
      checkIn , checkOut , numberOfGuests , name , phone,
      place:place._id ,
      price:numberOfNight*place.price,
    });
    
    const bookingId = response.data._id ;
    setRedirect(`/account/bookings/${bookingId}`) ;
  }
  
  if(redirect){
    return <Navigate to={redirect}/>
  }


  return(
        <div className="bg-white shadow p-4 rounded-2xl">
               <div className="text-2xl text-center mb-1">
                Price: {place.price}/per night
               </div>
              
              <div className="border rounded-2xl">
               <div className="flex grow shrink">
                <div className="py-3 px-4">
                 <label>Check in :</label>
                 <input type="date" 
                        value={checkIn} 
                        onChange={(ev)=>setCheckIn(ev.target.value)}/>
                </div>
             
                <div className="py-3 px-4 border-l">
                 <label>Check out :</label>
                 <input type="date" 
                        value={checkOut} 
                        onChange={(ev)=> setCheckOut(ev.target.value)}/>
                </div>
               </div>
                
                <div>
                  <div className="py-3 px-4 border-t">
                   <label>Number Of Guest :</label>
                   <input type="number" 
                          value={numberOfGuests} 
                          onChange={(ev)=>setNumberOfGuests(ev.target.value)}/>
                  </div>
                   {numberOfNight>0 &&(
                    <div className="py-3 px-4 border-t">
                     <label>Your Full Name :</label>
                     <input type="text" 
                          value={name} 
                          onChange={(ev)=>setName(ev.target.value)}/>
                     
                     <label>Phone Number</label>
                     <input type="tel" 
                          value={phone} 
                          onChange={(ev)=>setPhone(ev.target.value)}/>
                  </div>
                   )}
                </div>
              </div>

               <button className="primary mt-4" onClick={bookThisPlace}>Book This Place
                
                {numberOfNight>0 && (
                  <span className="font-bold"> -:{numberOfNight * place.price} </span>
                )}

               </button>
               

             </div>
    );
}