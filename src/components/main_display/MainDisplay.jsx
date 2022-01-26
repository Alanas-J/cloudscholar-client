import Home from './home/Home';
import NavigationBar from './navigation/NavigationBar';
import './MainDisplay.css';

function MainDisplay() {
    const display = useSelector(state => state.appDisplay.value);
    const dispatch = useDispatch();


    return (
        <div className='mainDisplay d-flex' >
            <NavigationBar/>
            {this.renderSwitch(display)}
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
            return <Home/>;
        
        default:
            return <LoginDisplay/>;
    }
  
  }