import styles from '../Home.module.css'
import Task from './task/Task'
import { useSelector} from 'react-redux';

function UpcomingTasksDisplay() {

    const userData = useSelector(state => state.userState.value.userData);
    const tasks = getTasks(userData);
    console.log(tasks);


    return (
        <div className={styles.display + " mt-4 border bg-light border-secondary"}>
                <Task colour='#80003A' taskName='Interrim Demo' time='24h' subject='Fourth Year Project' />
                <Task colour='#80AA3A' taskName='Assignment 1' time='24/2/22' subject='Another Module Placeholder' />

                {tasks? tasks.map(task => {return <Task task='task'/>}) : 'nothing' }

        </div>
    );
}   
export default UpcomingTasksDisplay;

function getTasks(userData) {

    // Many subjects have many tasks

    // merge all subject tasks into one array and keep subject name and colour.
    if (userData.subjects){
        return userData.subjects.reduce((tasks, subject) => {
            
            if(subject.tasks){
                for(let task of subject.tasks){

                    const standaloneTask = {
                        name: task.name,
                        due_time: task.due_datetime,
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

    } else {
        return [];
    }
}