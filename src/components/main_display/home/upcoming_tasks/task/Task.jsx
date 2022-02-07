import styles from './Task.module.css'

function Task({colour, taskName, time, subject}) {




    return (
        <div className={ styles.task+" border border-secondary m-1 rounded d-flex "}>
            <div className={"rounded-start me-2"} style={{width:'.45rem', backgroundColor: colour}}></div>

            <div className={styles.taskContent}>
                <div className="d-flex justify-content-between">
                    <div className={styles.taskTitleWidth+" pt-1"}>
                        <h5 className={styles.textOverflow + " border-bottom border-secondary p-1"}>{taskName}</h5>
                    </div>
                    <div className="me-3 ">[*]</div>
                </div>
                
                <div className="w-100">
                    <div>
                        <p className={styles.textOverflow + " m-0"}>
                        Due {time} - {subject}</p>
                    </div>
                    
                </div>
                
            </div>
        </div>
    );
}   

export default Task;