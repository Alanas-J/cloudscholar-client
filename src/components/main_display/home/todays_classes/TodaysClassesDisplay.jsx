import styles from '../Home.module.css'
import Class from './class/Class'
import {useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import getClassesForWeekday from '../../../../utility/user_data/parsing/getClassesForWeekday';
import {DateTime} from 'luxon';
import { useEffect, useRef, useState } from 'react';

function TodaysClassesDisplay() {

    const userData = useSelector(state => state.userState.value.userData);
    const [classes, setClasses] = useState(getClassesForWeekday(userData, DateTime.now().weekday));
    const componentMounted = useRef(false);

    useEffect(() => {
        componentMounted.current = true;
        
        setTimeout(() => {
            if(componentMounted.current)
                setClasses(getClassesForWeekday(userData, DateTime.now().weekday));
            }, 1000);
        
        return () => { componentMounted.current = false; };
    });

    return (
        <div className={styles.display + " mt-4 border bg-light rounded shadow p-1"}>
            {classes.length !== 0? classes.map(_class => {return <Class key={uuidv4()} _class={_class}/>}) : <div className='h5 h-100 p-3 m-0 text-center'> No classes left today! </div>}
        </div>
    );
}   

export default TodaysClassesDisplay;