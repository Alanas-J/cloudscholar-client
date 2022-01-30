import Home from './home/Home';
import Timetable from './timetable/Timetable';
import NavigationBar from './navigation/NavigationBar';
import './MainDisplay.css';

import { useSelector} from 'react-redux';

function MainDisplay() {
    const display = useSelector(state => state.appDisplay.value);

    return (
        <div className='mainDisplay d-flex'>
            <NavigationBar/>
            {renderSwitch(display)}
        </div>
    
    ); 
  }
  export default MainDisplay;
  
// Used to pick what to display.
function renderSwitch(display){
    switch(display) {
      
        case 'home':
            return <Home/>;
        
        case 'timetable':
            return <Timetable/>;
        
        default:
            return <Home/>;
    }
  
  }