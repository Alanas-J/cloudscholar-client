import weekdayStringToInt from "../misc/weekdayStringToInt";

function addClassToSubject(subjectName, classObject, userData){

    const newUserData = JSON.parse(JSON.stringify(userData));
    console.log('pre update')
    console.log(newUserData);

    classObject.day = weekdayStringToInt(classObject.day);

    for (let subject of newUserData.subjects){
        if (subject.name === subjectName){

            if(!subject.classes)
                subject.classes = [];

            subject.classes.push(classObject);
        }
            
    }

    console.log('after update');
    console.log(newUserData);

    return newUserData;
}
export default addClassToSubject;
