import styles from '../Home.module.css'
import Class from './class/Class'
import {useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import getClassesForWeekday from '../../../../utility/classes/getClassesForWeekday';

function TodaysClassesDisplay() {

    const userData = useSelector(state => state.userState.value.userData);
    const classes = getClassesForWeekday(userData, 1); // TODO: change this to today's weekday.

    // console.log(classes);

    return (
        <div className={styles.display + " mt-4 border border-secondary bg-light"}>
            {classes.length !== 0? classes.map(_class => {return <Class key={uuidv4()} _class={_class}/>}) : <div className='h5 h-100 p-3 m-0 text-center'> No classes! </div>}

        </div>
    );
}   

export default TodaysClassesDisplay;