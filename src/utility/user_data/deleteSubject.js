function deleteSubject(subject, userData){

    const newUserData = JSON.parse(JSON.stringify(userData));

    for(const [subjIndex, userSubject] of newUserData.subjects.entries()){

        if(subject.name === userSubject.name){

            newUserData.subjects.splice(subjIndex, 1);

        }
    }
    return newUserData;
}
export default deleteSubject;