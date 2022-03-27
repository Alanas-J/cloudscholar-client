import MainDisplay from './main_display/MainDisplay';
import LoginDisplay from './login_display/LoginDisplay';
import ModalManager from './modals/ModalManager';
import fetchUserData from '../utility/user_data/requests/fetchUserData';
import './App.css';

import {useSelector, useDispatch} from 'react-redux';

function App() {
   const loginState = useSelector(state => state.userState.value.loggedIn);

   const dispatch = useDispatch();

   // If user is already logged in
   if(!loginState){
      if(window.sessionStorage.getItem("token")){
         fetchUserData(dispatch);

      } else if(window.localStorage.getItem("token")){
         window.sessionStorage.setItem('token', window.localStorage.getItem("token"));
         fetchUserData(dispatch);

      }
   }

   return (
      <div className="App">
         {loginState? <MainDisplay/> : <LoginDisplay/>} 
         <ModalManager/>
      </div>
   );
}
export default App;
