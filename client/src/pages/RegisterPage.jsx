import { useState } from "react";
import {Link} from "react-router-dom" ;
import axios from "axios" ;

export default function RegisterPage(){
    const [name , SetName] = useState('');
    const [email , setEmail] = useState('') ;
    const [password ,setPassword] = useState('') ;
    
   async function registerUsers(ev){
      try{ 
        ev.preventDefault() ,
        console.log("Passing the name, email and pass into our api");
       await axios.post('/register',{
            name,
            email,
            password,
       });

       alert('Regitration completed.Now you can log in!');
      }
      catch(error){
        alert("Registration Failed please try again later.");
      } 
    }
     

   return(
    <div className="mt-4 grow flex items-center justify-around">
    <div className="mb-64">
     <h1 className="text-4xl text-center">Register</h1>
     <form className="max-w-md mx-auto mt-1 mb-4" onSubmit={registerUsers}>
        <input type="text" 
               placeholder="Your Name" 
               value={name} 
               onChange={(ev)=>{SetName(ev.target.value)}}/>

        <input type="email" 
               placeholder={"your@email.com"}
                value={email}
                onChange={(ev)=>{setEmail(ev.target.value)}}/>

        <input type="password" 
               placeholder={"password"}
               value={password}
               onChange={(ev)=>{setPassword(ev.target.value)}}/>

        <button className="primary">Register</button>

      <div className="text-center py-2 text-gray-500">
         Already Have Account ?<Link to={'/login'} className="text-black underline font-semibold"> Login</Link>
      </div> 
      
     </form>

    </div>
  </div>
   );
}

