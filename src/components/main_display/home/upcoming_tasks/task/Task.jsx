import styles from './Task.module.css'

function Task() {
    return (
        <div className={styles.colour +" "+ styles.task+" border m-1 rounded-start d-flex "}>
            <div className={"rounded-start me-2"} style={{width:'.3rem', backgroundColor:'light-green'}}>
                
            </div>

            <div className={styles.taskContent}>
                <div className="d-flex justify-content-between">
                    <div className={styles.taskTitleWidth+" pt-1"}>
                        <h5 className={styles.textOverflow + " border-bottom p-1"}>Assignment 2</h5>
                    </div>
                    <div className="me-3 ">[*]</div>
                </div>
                
                <div className="w-100">
                    <div>
                        <p className={styles.textOverflow + " m-0"}>
                        Due **/**/** - Software Engineering 5</p>
                    </div>
                    
                </div>
                
            </div>
        </div>
    );
}   

export default Task;