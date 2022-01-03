import Home from './home/Home';
import NavigationBar from './navigation/NavigationBar';
import './MainDisplay.css';

function MainDisplay() {
    return (
        <div className='mainDisplay d-flex' >
            <NavigationBar/>
            <Home></Home>
        </div>
    
    ); 
  }
  export default MainDisplay;
  