import styles from './Class.module.css'
import {DateTime} from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import findClass from '../../../../../utility/user_data/findClass';
import { openModal } from '../../../../../state/slices/modalState';


function Class({_class}) {
    const userData = useSelector(state => state.userState.value.userData);
    const dispatch = useDispatch()

    return (
        <div onClick={() => handleOpenViewModal(_class, userData, dispatch)} className={ styles.task+" m-1 rounded d-flex shadow"} style={{border: ".08rem solid " +_class.colour+"33"}}>
            <div className={"rounded-start me-2"} style={{width:'.25rem', backgroundColor:_class.colour}}></div>

            <div className={styles.taskContent}>
                <div className="d-flex justify-content-between">
                    <div className={styles.taskTitleWidth+" pt-1"}>
                        <h5 className={styles.textOverflow + " border-bottom border-secondary p-1"}>{_class.type && _class.type+" |"} {_class.subjectName}</h5>
                    </div>
                    <div className="me-3 "></div>
                </div>
                
                <div className="w-100">
                    <div>
                        <p className={styles.textOverflow + " m-0 ms-1"}>
                             {_class.duration_until.toMillis() > 0 ? "In "+_class.duration_until.toHuman({listStyle: 'long', maximumFractionDigits: 0}) : "Now"} | {_class.start_time.toLocaleString(DateTime.TIME_SIMPLE)} to {_class.end_time.toLocaleString(DateTime.TIME_SIMPLE)}
                        </p>
                    </div>
                    
                </div>
                
            </div>
        </div>
    );
}   
export default Class;

function handleOpenViewModal(_class, userData, dispatch){

    const foundClass = findClass(_class, userData);
        
    if(foundClass) 
        dispatch(openModal({name: 'ViewClass', data: foundClass }));
}