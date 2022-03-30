import { DateTime } from "luxon";
import getClassesForWeekday from "../user_data/parsing/getClassesForWeekday";
import getUpcomingTasks from "../user_data/parsing/getUpcomingTasks";
import {sendNotification} from "./notificationController";

let checkingInterval;
let notificationQueues;

function startNotificationService(userData){

    if (!checkingInterval){
        const upcomingClasses = getClassesForWeekday(userData, DateTime.now().weekday);
        const upcomingTasks = getUpcomingTasks(userData);

        notificationQueues = {tasks: upcomingTasks, classes: upcomingClasses}

        
        startCheckingInterval();
        
    } else {
        console.log('error: Notification service is already running.');
    }

}
export {startNotificationService};

function updateNotificationService(userData){

    const upcomingClasses = getClassesForWeekday(userData, DateTime.now().weekday);
    const upcomingTasks = getUpcomingTasks(userData);

    // safety close
    if(!checkingInterval)
        return;


    for(let _class of upcomingClasses){

        for(let oldClass of notificationQueues.classes){

            if(_class.subjectName === oldClass.subjectName && _class.type === oldClass.type && _class.start_time.toMillis() === oldClass.start_time.toMillis()){

                if(oldClass.notified){
                    _class.notified = true;
                }
            }
        }
    }
    for(let task of upcomingTasks){

        for(let oldTask of notificationQueues.tasks){

            if(task.subjectName === oldTask.subjectName && task.name === oldTask.name && task.due_time.toMillis() === oldTask.due_time.toMillis()){

                if(oldTask.notifiedToday){
                    task.notifiedToday = true;
                }
                if(oldTask.notifiedLastHour){
                    task.notifiedLastHour = true;
                }
            }
        }
    }


    notificationQueues = {tasks: upcomingTasks, classes: upcomingClasses}
}
export {updateNotificationService};


function checkNotifications(){

    notificationQueues.classes = notificationQueues.classes.map((_class) => {

        if(!_class.notified){
            
            if(_class.duration_until.toMillis() < 0){

                sendNotification(`Class now - ${_class.subjectName}`, `The class is currently happening.`)

                _class.notified = true;

            } else if(_class.duration_until.hours === 0 && _class.duration_until.minutes <= 30) {

                sendNotification(`Class soon - ${_class.subjectName}`, `The class will start in ${_class.duration_until.minutes}.`);

                _class.notified = true;
            }

        
        }

        return _class;
    });

    notificationQueues.tasks = notificationQueues.tasks.map((task) => {

        if(!task.notifiedToday){

            const duration_until = task.due_time.diffNow(['hours', 'minutes']);

            if(!task.notifiedLastHour){

                if(duration_until.toMillis() < 0){

                    sendNotification(`Task overdue - ${task.name} | ${task.subjectName}`, 'This task is overdue.');
                    task.notifiedLastHour = true;
                    task.notifiedToday = true;
                }  else if(duration_until.hours < 1){

                    sendNotification(`Task due soon - ${task.name} | ${task.subjectName}`, `Due in `+ duration_until.toHuman({listStyle: 'long', stripZeroUnits: "all", maximumFractionDigits: 0})+'.');
                    
                    task.notifiedLastHour = true;
                    task.notifiedToday = true;
                } 
            }
            
            if(duration_until.hours < 24 && !task.notifiedLastHour){

                sendNotification(`Task due today - ${task.name} | ${task.subjectName}`, `Due in `+ duration_until.toHuman({listStyle: 'long', stripZeroUnits: "all", maximumFractionDigits: 0})+'.');
                
                task.notifiedToday = true;
            } 
        }

        return task;
    });


}


function startCheckingInterval(){
    checkNotifications();
    checkingInterval = setInterval(checkNotifications, 60000);
} 


function clearCheckingInterval(){
    clearInterval(checkingInterval);
    checkingInterval = null;
}
export {clearCheckingInterval};