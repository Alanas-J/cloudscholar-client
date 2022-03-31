import { DateTime } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../../../state/slices/modalState';
import styles from './TimetableElement.module.css'
import findClass from '../../../../../utility/user_data/findClass'
import findTask from '../../../../../utility/user_data/findTask';

function TimetableElement({timetableElement, earliestHour}) {

    let offset;
    let height = .5;
    if(timetableElement.objectType === 'task'){
        offset = timetableElement.due_time.hour + timetableElement.due_time.minute/60 - earliestHour;
    } else {
        offset = timetableElement.start_time.hour + timetableElement.start_time.minute/60 - earliestHour;
        height = timetableElement.durationInH;
    }
    const width = 100/timetableElement.noOfPositions;
    const position = timetableElement.position * width;


    const userData = useSelector(state => state.userState.value.userData);
    const dispatch = useDispatch()


    return (
        <div onClick={() => handleOpenViewModal(timetableElement, userData, dispatch)} className={styles.element+" bg-light"} style={{top: offset*4.5+"rem", left: position+"%", width: width+"%", height: height*4.5+"rem", borderColor: timetableElement.colour+"77"}}>
            <div className={styles.elementColour} style={{backgroundColor: timetableElement.colour}}></div>
            {timetableElement.objectType === 'task'? renderTaskContent(timetableElement) : renderClassContent(timetableElement)}
        </div>


    ); 
}
export default TimetableElement;
  

function renderTaskContent(timetableElement){
    return (
        <div>
            <div className={styles.text+' px-1 border-bottom'}>Task: {timetableElement.name} - {timetableElement.subjectName}</div>
            <div className={styles.text+' px-2'}>Due {timetableElement.due_time.toLocaleString(DateTime.TIME_24_SIMPLE)}</div>            
        </div>
    )
}

function renderClassContent(timetableElement){
    return (
        <div>
            <div className={styles.text+' mx-1 border-bottom'}>{timetableElement.subjectName}</div>
            <div className={styles.text+' mx-1'}>{timetableElement.location}</div>
            <div className={styles.text+' border-bottom mx-1 pb-1'}>{timetableElement.type}</div>
            <div className={styles.text+' mx-1'}>{timetableElement.start_time.toLocaleString(DateTime.TIME_24_SIMPLE) +' - '+ timetableElement.end_time.toLocaleString(DateTime.TIME_24_SIMPLE)}</div>
            <div className={styles.text+' mx-1'}>{timetableElement.description}</div>

        </div>
    )
}

function handleOpenViewModal(timetableElement, userData, dispatch){

    if(timetableElement.objectType === 'class'){
        const _class = findClass(timetableElement, userData);
    
        if(_class)
            dispatch(openModal({name: 'ViewClass', data: _class}));

    } else if (timetableElement.objectType === 'task'){

        const task = findTask(timetableElement, userData);

        if(task)
            dispatch(openModal({name: 'ViewTask', data: task}));
    }
}
