import styles from './Class.module.css'

function Class({colour, classType, time, subject}) {

    return (
        <div className={ styles.task+" border border-secondary m-1 rounded d-flex "}>
            <div className={"rounded-start me-2"} style={{width:'.45rem', backgroundColor: colour}}></div>

            <div className={styles.taskContent}>
                <div className="d-flex justify-content-between">
                    <div className={styles.taskTitleWidth+" pt-1"}>
                        <h5 className={styles.textOverflow + " border-bottom border-secondary p-1"}>{classType} | {subject}</h5>
                    </div>
                    <div className="me-3 ">[*]</div>
                </div>
                
                <div className="w-100">
                    <div>
                        <p className={styles.textOverflow + " m-0"}>
                        In 30 Minutes. 12:30 - 14:00</p>
                    </div>
                    
                </div>
                
            </div>
        </div>
    );
}   

export default Class;