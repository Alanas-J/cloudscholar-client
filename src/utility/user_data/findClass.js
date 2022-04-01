import { DateTime } from "luxon";

function findClass(classData, userData){

    for(const subject of userData.subjects){
        
        if(classData.subjectName === subject.name){

            for(const _class of subject.classes){

                if(_class.day === classData.day &&
                    _class.location === classData.location &&
                    _class.type === classData.type &&
                    _class.start_time === classData.start_time.toLocaleString(DateTime.TIME_24_WITH_SECONDS) &&
                    _class.end_time ===  classData.end_time.toLocaleString(DateTime.TIME_24_WITH_SECONDS))
                {
                    const classObj = {..._class, subject: subject}
                    return classObj;
                }
            }
        }
    }
    return null;
}
export default findClass;