function deleteClass(_class, userData){

    const newUserData = JSON.parse(JSON.stringify(userData));

    for(const [subjIndex, subject] of newUserData.subjects.entries()){

        if(_class.subject.name === subject.name){

            for(const [classIndex, subjectClass] of subject.classes.entries()){

                if(_class.day === subjectClass.day &&
                    _class.location === subjectClass.location &&
                    _class.type === subjectClass.type &&
                    _class.start_time === subjectClass.start_time &&
                    _class.end_time ===  subjectClass.end_time
                    ){
                    
                    newUserData.subjects[subjIndex].classes.splice(classIndex, 1);

                    console.log(newUserData);
                    return newUserData;
                }
            }
        }
    }
}
export default deleteClass;