import MainDisplay from './main_display/MainDisplay';
import LoginDisplay from './login_display/LoginDisplay';
import ModalManager from './modals/ModalManager';
import './App.css';

import {useSelector} from 'react-redux';

function App() {
  const loginState = useSelector(state => state.userData.value.loggedIn);

  return (
    <div className="App">
      {loginState? <MainDisplay/> : <LoginDisplay/>} 
      <ModalManager/>
    </div>
  );
}
export default App;
