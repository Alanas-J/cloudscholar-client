import styles from './Class.module.css'
import {DateTime, Duration, Formats} from 'luxon';

function Class({_class}) {

    return (
        <div className={ styles.task+" border border-secondary m-1 rounded d-flex "}>
            <div className={"rounded-start me-2"} style={{width:'.3rem', backgroundColor: _class.colour}}></div>

            <div className={styles.taskContent}>
                <div className="d-flex justify-content-between">
                    <div className={styles.taskTitleWidth+" pt-1"}>
                        <h5 className={styles.textOverflow + " border-bottom border-secondary p-1"}>{_class.type} | {_class.subjectName}</h5>
                    </div>
                    <div className="me-3 "></div>
                </div>
                
                <div className="w-100">
                    <div>
                        <p className={styles.textOverflow + " m-0"}>
                            In {_class.duration_until.toHuman({listStyle: 'short', maximumFractionDigits: 0})} | {_class.start_time.toLocaleString(DateTime.TIME_SIMPLE)} to {_class.end_time.toLocaleString(DateTime.TIME_SIMPLE)}
                        </p>
                    </div>
                    
                </div>
                
            </div>
        </div>
    );
}   

export default Class;