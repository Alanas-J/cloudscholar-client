import { DateTime } from 'luxon';
import styles from './TimetableElement.module.css'

function TimetableElement({timetableElement, earliestHour}) {

    // Parse offset and height params.
    let offset;
    let height = .5;
    if(timetableElement.objectType === 'task'){
        offset = timetableElement.due_time.hour + timetableElement.due_time.minute/60 - earliestHour;
    } else {
        offset = timetableElement.start_time.hour + timetableElement.start_time.minute/60 - earliestHour;
        height = timetableElement.durationInH;
    }

    // Width %
    const width = 100/timetableElement.noOfPositions;
    // Get positioning %
    const position = timetableElement.position * width;

    return (
        <div className={styles.element+" bg-light"} style={{top: offset*5+"rem", left: position+"%", width: width+"%", height: height*5+"rem", borderColor: timetableElement.colour+"44"}}>
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