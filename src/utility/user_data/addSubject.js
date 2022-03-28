import convertIEDateToISO from "../misc/convertIEDateToISO";

function addClassToSubject(subjectObject, userData){

    const newUserData = JSON.parse(JSON.stringify(userData));
    console.log('pre update')
    console.log(newUserData);

    subjectObject.start_date = convertIEDateToISO(subjectObject.start_date);
    subjectObject.end_date = convertIEDateToISO(subjectObject.end_date);

    if(!newUserData.subjects)
        newUserData.subjects = [];

    newUserData.subjects.push(subjectObject);

    console.log('after update');
    console.log(newUserData);

    return newUserData;
}
export default addClassToSubject;


