import './App.css' ;
import {Routes , Route} from "react-router-dom" ;
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import AccountPage from './pages/ProfilePage';
import PlacesPage from './pages/PlacesPage';
import PlacesFormPage from './pages/PlacesFormPage';


axios.defaults.baseURL='http://localhost:4000' ;
axios.defaults.withCredentials=true;

function App() {
  
  return (
   
   <UserContextProvider>
     <Routes>
     {/* By creating the layout as a parent we are rendering header inside layout every where , whenever this index and "/login" routes are called */}
      <Route path='/' element={<Layout/>}>
        <Route index element={<IndexPage/>}/>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        {/* When a URL matches the pattern /account/:subpage, the value of the dynamic parameter 'subpage' is captured from the actual URL. */}
        {/* If you add a ? to a parameter in a route path, it makes that parameter optional. This means that the route will match both with and without the optional parameter. */}
        <Route path='/account' element={<AccountPage/>} />
        <Route path='/account/places' element={<PlacesPage/>} />
        <Route path='/account/places/new' element={<PlacesFormPage/>} />
        <Route path='/account/places/:id' element={<PlacesFormPage/>} />        
      </Route>
     </Routes>
    </UserContextProvider>
   
  )
}

export default App
