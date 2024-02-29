import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage(){
    
    const {id} = useParams() ;
    const [place,setPlace] = useState(null);

    useEffect(()=>{
       if(!id){
        return ;
       }
     
     axios.get(`/places/${id}`).then(response =>{
       setPlace(response.data) ;
     })

    },[id])
    
    // This pattern is often used to handle cases where the data (place in this context) is not yet available, such as during an asynchronous data fetching operation. When the data is not available, the component returns an empty string or some placeholder content, and once the data is loaded and the state is updated, the component will re-render with the actual content.
    if(!place){
        return '...loading'
    }

    // target="_blank": This is an attribute of the anchor element. It specifies that the link should be opened in a new tab or window when clicked. The value "_blank" is used to achieve this behavior.
    return(
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-3xl">{place.title}</h1>
            <AddressLink place={place}/>
            <PlaceGallery place={place}/>
            
         <div className="mt-4 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
           <div>
            <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
             {place.description}
            </div>

             Check-In : {place.checkIn}<br/>
             Check-Out :{place.checkOut}<br/>
             Max Number Of Guest: {place.maxGuest} <br/>
           </div>
            
           <div>
             <BookingWidget place={place}/>
           </div>
         </div>
          
          <div className="bg-white -mx-8 px-8 py-8 border-t">
            <div>
             <h2 className="font-semibold text-2xl">Extra Info</h2>
            </div>

            <div className="text-sm text-gray-700 leading-5 mt-2 mb-4">
              {place.extraInfo}
            </div>
          </div>
        </div>
    )
}