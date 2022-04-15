function findTask(taskData, userData){

    for(const subject of userData.subjects){
        
        if(taskData.subjectName === subject.name){


            for(const task of subject.tasks){

                if(task.name === taskData.name){
                    const taskObj = {...task, subject: subject}
                    return taskObj;
                }
            }
        }
    }
    return null;
}
export default findTask;