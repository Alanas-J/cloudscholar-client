
import { useState } from 'react';
import MainDisplay from './main_display/MainDisplay';
import LoginDisplay from './login_display/LoginDisplay';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // will be used as the hook to dictate if logged in.


  return (
    <div className="App">
      {loggedIn? <MainDisplay/> : <LoginDisplay setLoggedIn={setLoggedIn}/>} 
        
    </div>
  );
}

export default App;
