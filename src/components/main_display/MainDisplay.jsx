import Home from './home/Home';
import Timetable from './timetable/Timetable';
import NavigationBar from './navigation_bar/NavigationBar';
import './MainDisplay.css';
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux';
import {sendNotification} from '../../utility/notifications/notificationController';
import getClassesForWeekday from '../../utility/user_data/parsing/getClassesForWeekday';
import { DateTime } from 'luxon';
import getUpcomingTasks from '../../utility/user_data/parsing/getUpcomingTasks';
import { startNotificationService, updateNotificationService } from '../../utility/notifications/notificationService';

function MainDisplay() {
    const display = useSelector(state => state.appDisplay.value);
    const userData = useSelector(state => state.userState.value.userData);
    const [loggingIn, setLoggingIn] = useState(true);


    useEffect(() => {
        if(loggingIn){
            sendNotification('Hello!', `You have ${getClassesForWeekday((userData), DateTime.now().weekday).length} classes left today and ${getUpcomingTasks(userData).length} upcoming tasks.`);
    
            startNotificationService(userData);
            setLoggingIn(false);
        } else{
            updateNotificationService(userData);
        }
    }, [loggingIn, userData]);

    
    return (
        <div className='mainDisplay d-flex' >
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


