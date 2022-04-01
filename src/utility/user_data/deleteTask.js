function deleteTask(task, userData){

    const newUserData = JSON.parse(JSON.stringify(userData));

    for(const [subjIndex, subject] of newUserData.subjects.entries()){

        if(task.subject.name === subject.name){

            for(const [taskIndex, subjectTask] of subject.tasks.entries()){

                if(task.name === subjectTask.name &&
                    task.due_datetime === subjectTask.due_datetime
                    ){
                    
                    newUserData.subjects[subjIndex].tasks.splice(taskIndex, 1);

                }
            }
        }
    }
    return newUserData;
}
export default deleteTask;