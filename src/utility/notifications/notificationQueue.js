import { DateTime } from "luxon";
import getClassesForWeekday from "../user_data/parsing/getClassesForWeekday";
import getUpcomingTasks from "../user_data/parsing/getUpcomingTasks";
import sendNotification from "./sendNotification";

function getNotificationQueues(userData){

    const upcomingClasses = getClassesForWeekday(userData, DateTime.now().weekday);
    const upcomingTasks = getUpcomingTasks(userData);

    //console.log(upcomingClasses);
    console.log(upcomingTasks);

    const notificationQueues = checkNotifications({classes: upcomingClasses, tasks: upcomingTasks});
    notificationQueues.updateState = false;

    return notificationQueues;
}
export {getNotificationQueues};


function checkNotifications(notificationQueues){

    let updateFlag = false;

    const classes = notificationQueues.classes.map((_class) => {

        if(!_class.notified){
            if(_class.duration_until.hours === 0 && _class.duration_until.minutes <= 30){


                if(_class.duration_until.toMillis() < 0){

                    sendNotification(`Class now - ${_class.subjectName}`, `The class is currently happening.`)
                } else {

                    sendNotification(`Class soon - ${_class.subjectName}`, `The class will start in ${_class.duration_until.minutes}.`);

                }

                updateFlag = true;
                _class.notified = true;
            }
        }

        return _class;
    });

    const tasks = notificationQueues.tasks.map((task) => {

        if(!task.notifiedToday){

            const duration_until = task.due_time.diffNow(['hours', 'minutes']);

            console.log(duration_until);

            if(!task.notifiedLastHour){

                if(duration_until.toMillis() < 0){

                    sendNotification(`Task overdue - ${task.name} | ${task.subjectName}`, 'This task is overdue.');
                    updateFlag = true;
                    task.notifiedLastHour = true;
                    task.notifiedToday = true;
                }  else if(duration_until.hours < 1){

                    sendNotification(`Task due soon - ${task.name} | ${task.subjectName}`, `Due in `+ duration_until.toHuman({listStyle: 'long', stripZeroUnits: "all", maximumFractionDigits: 0})+'.');
                    
                    updateFlag = true;
                    task.notifiedLastHour = true;
                    task.notifiedToday = true;
                } 
            }
            
            if(duration_until.hours < 24 && !task.notifiedLastHour){

                sendNotification(`Task due today - ${task.name} | ${task.subjectName}`, `Due in `+ duration_until.toHuman({listStyle: 'long', stripZeroUnits: "all", maximumFractionDigits: 0})+'.');
                
                updateFlag = true;
                task.notifiedToday = true;
            } 
        }

        return task;
    });

    return {classes: classes, tasks: tasks, updateState: updateFlag};

}
export {checkNotifications};