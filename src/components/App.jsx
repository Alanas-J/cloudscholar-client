
import { useState } from 'react';
import MainDisplay from './main_display/MainDisplay';
import LoginDisplay from './login_display/LoginDisplay';
import './App.css';

import { useSelector, useDispatch } from 'react-redux';

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // will be used as the hook to dictate if logged in.

  const display = useSelector(state => state.appDisplay.value);
  const dispatch = useDispatch();


  return (
    <div className="App">
      {loggedIn? <MainDisplay/> : <LoginDisplay setLoggedIn={setLoggedIn}/>} 
        
    </div>
  );
}
export default App;


// Used to pick what to display.
function renderSwitch(display){
  switch(display) {
    case 'login':
      return <LoginDisplay/>;

    case 'main_display':
      return <LoginDisplay/>;  
    
      
    default:
      return <LoginDisplay/>;
  }

}

