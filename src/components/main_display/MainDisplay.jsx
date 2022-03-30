import Home from './home/Home';
import Timetable from './timetable/Timetable';
import NavigationBar from './navigation_bar/NavigationBar';
import './MainDisplay.css';
import {useEffect, useState} from 'react'
import { useSelector} from 'react-redux';
import sendNotification from '../../utility/notifications/sendNotification';
import getClassesForWeekday from '../../utility/user_data/parsing/getClassesForWeekday';
import { DateTime } from 'luxon';
import getUpcomingTasks from '../../utility/user_data/parsing/getUpcomingTasks';
import { getNotificationQueues, checkNotifications } from '../../utility/notifications/notificationQueue';

function MainDisplay() {
    const display = useSelector(state => state.appDisplay.value);
    const userData = useSelector(state => state.userState.value.userData);
    const [notificationQueues, setNotificationQueues] = useState(null);

    if(!notificationQueues){
        sendNotification('Hello!', `You have ${getClassesForWeekday((userData), DateTime.now().weekday).length} classes left today and ${getUpcomingTasks(userData).length} upcoming tasks.`);
        
        setNotificationQueues(getNotificationQueues(userData));
    }

    useEffect(() => {
        const notifications = checkNotifications(notificationQueues);

        if(notifications.updateState){
            notifications.updateState = false;
            setNotificationQueues(notifications);

        }
    }, [notificationQueues]);

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

function initalizeNotificationQueues(userData, setNotificationQueues){
    
}


