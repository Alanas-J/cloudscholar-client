import styles from './Task.module.css'

function Task({task}) {

    


    return (
        <div className={ styles.task+" border border-secondary m-1 rounded d-flex "}>
            <div className={"rounded-start me-2"} style={{width:'.3rem', backgroundColor:task.colour}}></div>

            <div className={styles.taskContent}>
                <div className="d-flex justify-content-between">
                    <div className={styles.taskTitleWidth+" pt-1"}>
                        <h5 className={styles.textOverflow + " border-bottom border-secondary p-1"}>{task.name}</h5>
                    </div>
                    <div className="me-3 "></div>
                </div>
                
                <div className="w-100">
                    <div>
                        <p className={styles.textOverflow + " m-0"}>
                        Due {dueDateToString(task.due_time)} - {task.subjectName}</p>
                    </div>
                    
                </div>
                
            </div>
        </div>
    );
}   
export default Task;

// TODO: make a nice duetime string format.
function dueDateToString(due_time){

    const date = new Date(due_time)


    return date.toUTCString();
}