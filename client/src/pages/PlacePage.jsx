import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import BookingWidget from "../BookingWidget";

export default function PlacePage(){
    
    const {id} = useParams() ;
    const [place,setPlace] = useState(null);
    const [showAllPhoto , setShowAllPhoto] = useState(false) ;

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

    if(showAllPhoto){
        return(
            <div className="absolute min-w-full min-h-screen inset-0 bg-black text-white">
             <div className="p-8 grid gap-4 bg-black">
               <div>
                
                <h2 className="text-3xl mr-36">Photos of {place.title}</h2>

                <button onClick={()=>setShowAllPhoto(false)} className="flex gap-1 py-2 px-4 rounded-2xl text-black font-semibold bg-white shadow-gray-600 fixed top-8 right-14">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-7">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                  </svg>
                close photo</button>
               </div>

              {place?.photos?.length >0 && place.photos.map(photo =>(
                <div>
                   <img src={"http://localhost:4000/uploads/"+photo}></img>
                </div>
               ))}
             </div>
            </div>
        )
    }

    // target="_blank": This is an attribute of the anchor element. It specifies that the link should be opened in a new tab or window when clicked. The value "_blank" is used to achieve this behavior.
    return(
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-3xl">{place.title}</h1>
            <a className="my-2 `font-semibold underline flex gap-1" target="_blank" href={`https://maps.google.com/?q=${place.address}`}>
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
             <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
             <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
             </svg>
             {place.address}
            </a>
          
          <div className="relative">
             
          <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
            <div>
               <div>
                  {place.photos?.[0] &&(
                    <img onClick={()=>setShowAllPhoto(true)} className="aspect-square object-cover cursor-pointer" src={"http://localhost:4000/uploads/"+place.photos[0]}></img>
                  )}
               </div>
            </div>

            <div className="grid">
                {place.photos?.[1] &&(
                    <img onClick={()=>setShowAllPhoto(true)} className="aspect-square object-cover cursor-pointer" src={"http://localhost:4000/uploads/"+place.photos[1]}></img>
                )}

                <div className="overflow-hidden">
                   {place.photos?.[2] &&(
                    <img onClick={()=>setShowAllPhoto(true)} className="aspect-square object-cover relative top-2" src={"http://localhost:4000/uploads/"+place.photos[2]}></img>
                   )}
                </div>
              </div>
            </div>
            <button onClick={(ev)=>setShowAllPhoto(true)} className="absolute bottom-0 right-0 py-2 px-4 bg-white rounded-2xl shadow-gray-500 flex gap-1 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
              </svg>
              Show More Photos.
            </button>
          </div>
         
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