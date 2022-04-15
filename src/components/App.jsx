import MainDisplay from './main_display/MainDisplay';
import LoginDisplay from './login_display/LoginDisplay';
import ModalManager from './modals/ModalManager';
import fetchUserData from '../utility/requests/fetchUserData';
import './app.css';

import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';

function App() {
   const loggedIn = useSelector(state => state.userState.value.loggedIn);

   const dispatch = useDispatch();

   useEffect(() => {
      if(!loggedIn){
         if(window.sessionStorage.getItem("token")){
            fetchUserData(dispatch);
   
         } else if(window.localStorage.getItem("token")){
            window.sessionStorage.setItem('token', window.localStorage.getItem("token"));
            window.sessionStorage.setItem('refresh_token', window.localStorage.getItem("refresh_token"));
            fetchUserData(dispatch);
   
         }
      }
   });

   return (
      <div className="App">
         {loggedIn? <MainDisplay/> : <LoginDisplay/>} 
         <ModalManager/>
      </div>
   );
}
export default App;
