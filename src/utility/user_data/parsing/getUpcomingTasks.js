import { DateTime } from "luxon";

function getUpcomingTasks(userData) {

    // Many subjects have many tasks

    // merge all subject tasks into one array and keep subject name and colour.
    if (userData.subjects){
        const taskList = userData.subjects.reduce((tasks, subject) => {
            
            if(subject.tasks){
                for(let task of subject.tasks){

                    if(task.completed)
                        break;

                    const standaloneTask = {
                        name: task.name,
                        due_time: DateTime.fromISO(task.due_datetime),
                        colour: subject.colour,
                        subjectName: subject.name,
                        description: task.description,
                        completed: task.completed
                    }
                    tasks.push(standaloneTask);
                }
            }
            return tasks;

        }, []);

        return taskList.sort((task_a, task_b) => task_a.due_time - task_b.due_time);

    } else {
        return [];
    }
}
export default getUpcomingTasks;

