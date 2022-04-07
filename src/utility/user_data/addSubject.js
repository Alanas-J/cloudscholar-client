import convertIEDateToISO from "../misc/convertIEDateToISO";

function addClassToSubject(subjectObject, userData){

    const newUserData = JSON.parse(JSON.stringify(userData));

    subjectObject.start_date = convertIEDateToISO(subjectObject.start_date);
    subjectObject.end_date = convertIEDateToISO(subjectObject.end_date);

    if(!newUserData.subjects)
        newUserData.subjects = [];

    newUserData.subjects.push(subjectObject);

    return newUserData;
}
export default addClassToSubject;


