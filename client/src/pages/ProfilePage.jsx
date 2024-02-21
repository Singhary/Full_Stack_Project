import React, { useState } from "react";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function AccountPage(){
    
    const[redirect , setRedirect]=useState(null) ;
    const {ready,user,setUser}=useContext(UserContext);

    // Here, useParams is a hook from React Router that allows you to access the values of dynamic parameters.
    let {subpage}=useParams();
    console.log(subpage) ;
    if(subpage===undefined){
        subpage = 'profile' ;
    }

    async function logout(){
       await axios.post('/logout') ;
       setUser(null) ;
       setRedirect('/') ;
    }

    if(!ready){
        return 'loading...' ;
    }

    //if we are ready and user is not present then we redirect it to login page
    if(ready && !user && !redirect){
        return <Navigate to={'/login'}/> ;
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }

    return(
    <div>
       <AccountNav/>
      {subpage=='profile' && user &&(
        <div className="text-center max-w-lg mx-auto">
           Logged in as {user.name} ({user.email})<br/>
           <button onClick={logout} className="primary max-w-sm mt-2">Log out</button>
        </div>
      )}

      {subpage=='places' && (
        <PlacesPage/>
      )}

    </div>
    );
}