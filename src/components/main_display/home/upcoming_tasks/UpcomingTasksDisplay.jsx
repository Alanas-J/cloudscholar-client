import styles from '../Home.module.css'
import Task from './task/Task'
import {useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid';

function UpcomingTasksDisplay() {

    const userData = useSelector(state => state.userState.value.userData);
    const tasks = getTasks(userData);
    // console.log(tasks);


    return (
        <div className={styles.display + " mt-4 border bg-light rounded shadow p-1"}>
                {tasks.length !== 0? tasks.map(task => {return <Task key={uuidv4()} task={task}/>}) : <div className='h5 h-100 p-3 m-0 '> You're currently clear of any tasks! Do you have any to add? </div>}
        </div>
    );
}   
export default UpcomingTasksDisplay;

// TODO: This will prob be moved into its own file
function getTasks(userData) {

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
                        due_time: new Date(task.due_datetime),
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

        return taskList.sort((task_a, task_b) => task_a.due_time.getTime() > task_b.due_time.getTime());

    } else {
        return [];
    }
}