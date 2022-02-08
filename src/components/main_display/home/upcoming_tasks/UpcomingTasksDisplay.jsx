import styles from '../Home.module.css'
import Task from './task/Task'

function UpcomingTasksDisplay() {
    return (
        <div className={styles.display + " mt-4 border bg-light border-secondary"}>
                <Task colour='#80003A' taskName='Interrim Demo' time='24h' subject='Fourth Year Project' />
                <Task colour='#80AA3A' taskName='Assignment 1' time='24/2/22' subject='Another Module Placeholder' />
        </div>
    );
}   

export default UpcomingTasksDisplay;