import {Link} from "react-router-dom" ;
import Header from "../Header";
import { useEffect, useState } from "react";
import axios from "axios";

export default function IndexPage(){
  
  const[places , setPlaces] = useState([])

  useEffect(()=>{
    axios.get('places').then((response)=>{
       setPlaces(response.data);
    })
  },[])

  return(
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-8 gap-x-6 gap-y-8">
    {places.length>0 && places.map((place)=>(
      <Link to={'/place/'+place._id}>
        <div className="rounded-2xl flex bg-gray-400 mb-2">
         {place.photos?.[0] && (
           <img className="rounded-2xl aspect-square object-cover" src={'http://localhost:4000/uploads/'+place.photos?.[0]}/>
         )}
         </div> 

        <h3 className="font-bold"> {place.address}</h3>
        <h2 className="text-small leading-4 text-gray-500 ">{place.title}</h2>
         <div className="flex gap-1 mt-1">
         <span className="font-bold flex"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6 rounded-2xl">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>{place.price}</span>per night 
         </div>
      </Link>
    ))}
  </div>
  );
}