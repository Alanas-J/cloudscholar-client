import styles from '../Home.module.css'
import Task from './task/Task'
import {useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import getUpcomingTasks from '../../../../utility/user_data/parsing/getUpcomingTasks';
import {useEffect, useRef, useState} from 'react';

function UpcomingTasksDisplay() {

    const userData = useSelector(state => state.userState.value.userData);
    const [tasks, setTasks] = useState(getUpcomingTasks(userData));
    const componentMounted = useRef(false);


    useEffect(() => {
        componentMounted.current = true;
        
        setTimeout(() => {
            if(componentMounted.current)
                setTasks(getUpcomingTasks(userData));
            }, 1000);

        return () => { componentMounted.current = false; };
    });

    return (
        <div className={styles.display + " mt-4 border bg-light rounded shadow p-1"}>
                {tasks.length !== 0? tasks.map(task => {return <Task key={uuidv4()} task={task}/>}) : <div className='h5 h-100 p-3 m-0 '> You're currently clear of any tasks! Do you have any to add? </div>}
        </div>
    );
}   
export default UpcomingTasksDisplay;
