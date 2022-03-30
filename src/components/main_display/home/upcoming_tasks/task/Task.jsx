import styles from './Task.module.css';
import { DateTime } from "luxon";


function Task({task}) {

    return (
        <div className={ styles.task+" m-1 rounded d-flex shadow"} style={{border: ".08rem solid " +task.colour+"33"}}>
            <div className={"rounded-start me-2"} style={{width:'.25rem', backgroundColor:task.colour}}></div>

            <div className={styles.taskContent}>
                <div className="d-flex justify-content-between">
                    <div className={styles.taskTitleWidth+" pt-1"}>
                        <h5 className={styles.textOverflow + " border-bottom border-secondary p-1"}>{task.name} | {task.subjectName}</h5>
                    </div>
                    <div className="me-3 "></div>
                </div>
                
                <div className="w-100">
                    <div>
                        <p className={styles.textOverflow + " m-0 ms-1"}>
                            {printDueTime(task.due_time)}
                        </p>
                    </div>
                    
                </div>
                
            </div>
        </div>
    );
}   
export default Task;

function printDueTime(time){

    const durationUntil = time.diffNow(['days', 'hours', 'minutes']); // time.diffNow(['hours', 'minutes']);

    // Luxon is missing a strippling feature for toHuman(). This is a fix.
    if(durationUntil.days === 0){
        delete durationUntil.values.days;

        if(durationUntil.hours === 0){
            delete durationUntil.values.hours;
        }
    }

    if(durationUntil.toMillis() < 1){
        return "Overdue"
    }

    if(durationUntil.days > 6){
        return "Due "+time.toLocaleString(DateTime.DATE_HUGE);
    }


    return "Due in "+ durationUntil.toHuman({listStyle: 'long', stripZeroUnits: "all", maximumFractionDigits: 0});
}

