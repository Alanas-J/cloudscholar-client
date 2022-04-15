import { DateTime } from "luxon";
import convertIEDateToISO from "../misc/convertIEDateToISO";

function addTaskToSubject(subjectName, taskObject, userData){

    const newUserData = JSON.parse(JSON.stringify(userData));

    taskObject.due_datetime = DateTime.fromISO(convertIEDateToISO(taskObject.due_date)+"T"+taskObject.due_time).toISO(); 

    delete taskObject.due_date;
    delete taskObject.due_time;

    for (let subject of newUserData.subjects){
        if (subject.name === subjectName){
            
            if(!subject.tasks)
                subject.tasks = [];

            subject.tasks.push(taskObject);
        }
            
    }

    return newUserData;
}
export default addTaskToSubject;
