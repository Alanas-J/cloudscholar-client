import convertIEDateToISO from "../misc/convertIEDateToISO";

function addTaskToSubject(subjectName, taskObject, userData){

    const newUserData = JSON.parse(JSON.stringify(userData));
    console.log('pre update')
    console.log(newUserData);


    taskObject.due_datetime = convertIEDateToISO(taskObject.due_date)+" "+taskObject.due_time

    delete taskObject.due_date;
    delete taskObject.due_time;


    for (let subject of newUserData.subjects){
        if (subject.name === subjectName){
            
            if(!subject.tasks)
                subject.tasks = [];

            subject.tasks.push(taskObject);
        }
            
    }

    console.log('after update');
    console.log(newUserData);

    return newUserData;
}
export default addTaskToSubject;
