import styles from '../Home.module.css'
import Task from './task/Task'

function UpcomingTasksDisplay() {
    return (
        <div className={styles.height83 + " mt-4 border bg-light border-secondary"}>
                <Task/>
        </div>
    );
}   

export default UpcomingTasksDisplay;