import styles from './TimetableDisplay.module.css'
import getTimetableDataForWeek from '../../../../utility/user_data/parsing/getTimetableDataForWeek';
import {useState, useRef, useEffect, useReducer} from 'react';
import {DateTime} from 'luxon';
import {useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import TimetableElement from './timetable_element/TimetableElement';

function TimetableDisplay() {
    const [, forceUpdate] = useReducer(count => count + 1, 0);
    const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
    const [scrollIntoView, setScrollIntoView] = useState(true);


    const date = DateTime.now().plus({weeks: currentWeekOffset});
    const startOfTheWeek = date.set({hour: 0, minute: 0}).minus({days: date.weekday-1});
    const endOfTheWeek = date.set({hour: 0, minute: 0}).plus({days: 7-date.weekday});

    const timeIndicatorRef = useRef();
    const componentMounted = useRef(false);

    
    const userData = useSelector(state => state.userState.value.userData);
    const timetableData = getTimetableDataForWeek(userData, startOfTheWeek);


    const earliestHour = timetableData.earliestHour || 9;
    const latestHour = timetableData.latestHour || 18;



    useEffect(() => {
        componentMounted.current = true;
        
        setTimeout(() => {
            if(componentMounted.current)
                forceUpdate();
        }, 30000);

        return () => { componentMounted.current = false; };
    });
    useEffect(() => {
        if(timeIndicatorRef.current && scrollIntoView){
            timeIndicatorRef.current.scrollIntoView({block: "center", behavior: "smooth"});
            setScrollIntoView(false);
        }
    }, [scrollIntoView]);
    

    return (
        
        <div className={styles.timetableDisplay+" "}>
            <div className=" ms-1 mb-3 ">
                 <div className="d-inline-flex bg-light rounded border shadow p-0">

                    <div className="p-0 m-0">
                        <button type="button border" onClick={() => setCurrentWeekOffset(currentWeekOffset-1)} className="btn btn-primary m-0">&lt;</button>
                    </div>
                    <div className="p-0 ps-1 m-0">
                        <button type="button" onClick={() => setCurrentWeekOffset(currentWeekOffset+1)} className="btn btn-primary">&gt;</button>
                    </div>

                    <div className="align-items-center">
                        <h5 className="m-0 p-1 mt-1  px-3 ">
                            {startOfTheWeek.day} {startOfTheWeek.monthShort} - {endOfTheWeek.day} {endOfTheWeek.monthShort}, {endOfTheWeek.year} {currentWeekOffset === 0 && ' (Current Week)'}
                        </h5>
                    </div>
                </div>
            </div>


            <div className="row mx-1 py-2 rounded-top text-center border bg-primary text-white shadow">
                <div className={styles.timeCol+" col"}>
                </div>
                <div className="col">
                    <div>Moday</div>
                </div>
                <div className="col">
                    <div>Tuesday</div>
                </div>
                <div className="col">
                    <div>Wednesday</div>
                </div>
                <div className="col">
                    <div>Thursday</div>
                </div>
                <div className="col">
                    <div>Friday</div>
                </div>
                <div className="col">
                    <div>Saturday</div>
                </div>
                <div className="col">
                    <div>Sunday</div>
                </div>
                <div style={{width: "10px"}}></div>
            </div>

            <div className={styles.display + " row mx-1 border-start border-bottom border-end bg-light shadow"}>
                <div className={styles.timeCol+" col border p-0"}>
                    {generateTimelist(earliestHour, latestHour)}
                </div>
                <div className="col border p-0">
                    <div className={styles.timeOffset}>
                        {(date.weekday === 1 && currentWeekOffset === 0 && date.hour >= earliestHour && date.hour < latestHour) && renderTimeIndicator(date, earliestHour, timeIndicatorRef)}
                        {timetableData.dayData[0].map((elementData) => <TimetableElement key={uuidv4()} timetableElement={elementData} earliestHour={earliestHour}/>)}
                    </div>
                    {generateTimeblocks(latestHour-earliestHour+1)}   
                </div>
                <div className="col border p-0">
                    <div className={styles.timeOffset}>
                        {(date.weekday === 2 && currentWeekOffset === 0 && date.hour >= earliestHour && date.hour < latestHour) && renderTimeIndicator(date, earliestHour, timeIndicatorRef)}
                        {timetableData.dayData[1].map((elementData) => <TimetableElement key={uuidv4()} timetableElement={elementData} earliestHour={earliestHour}/>)}
                    </div>
                    {generateTimeblocks(latestHour-earliestHour+1)}
                </div>
                <div className="col border p-0">
                    <div className={styles.timeOffset}>
                        {(date.weekday === 3 && currentWeekOffset === 0 && date.hour >= earliestHour && date.hour < latestHour) && renderTimeIndicator(date, earliestHour, timeIndicatorRef)}
                        {timetableData.dayData[2].map((elementData) => <TimetableElement key={uuidv4()} timetableElement={elementData} earliestHour={earliestHour}/>)}
                    </div>
                    {generateTimeblocks(latestHour-earliestHour+1)}
                </div>
                <div className="col border p-0">
                    <div className={styles.timeOffset}>
                        {(date.weekday === 4 && currentWeekOffset === 0 && date.hour >= earliestHour && date.hour < latestHour) && renderTimeIndicator(date, earliestHour, timeIndicatorRef)}
                        {timetableData.dayData[3].map((elementData) => <TimetableElement key={uuidv4()} timetableElement={elementData} earliestHour={earliestHour}/>)}
                    </div>
                    {generateTimeblocks(latestHour-earliestHour+1)}
                </div>
                <div className="col border p-0">
                    <div className={styles.timeOffset}>
                        {(date.weekday === 5 && currentWeekOffset === 0 && date.hour >= earliestHour && date.hour < latestHour) && renderTimeIndicator(date, earliestHour, timeIndicatorRef)}
                        {timetableData.dayData[4].map((elementData) => <TimetableElement key={uuidv4()} timetableElement={elementData} earliestHour={earliestHour}/>)}
                    </div>
                    {generateTimeblocks(latestHour-earliestHour+1)}  
                </div>
                <div className="col border p-0">
                    <div className={styles.timeOffset}>
                        {(date.weekday === 6 && currentWeekOffset === 0 && date.hour >= earliestHour && date.hour < latestHour) && renderTimeIndicator(date, earliestHour, timeIndicatorRef)}
                        {timetableData.dayData[5].map((elementData) => <TimetableElement key={uuidv4()} timetableElement={elementData} earliestHour={earliestHour}/>)}
                    </div>
                    {generateTimeblocks(latestHour-earliestHour+1)}
                </div>
                <div className="col border p-0">
                    <div className={styles.timeOffset}>
                        {(date.weekday === 7 && currentWeekOffset === 0 && date.hour >= earliestHour && date.hour < latestHour) && renderTimeIndicator(date, earliestHour, timeIndicatorRef)}
                        {timetableData.dayData[6].map((elementData) => <TimetableElement key={uuidv4()} timetableElement={elementData} earliestHour={earliestHour}/>)}
                    </div>
                    {generateTimeblocks(latestHour-earliestHour+1)}
                </div>
            </div>
        </div>
        


    ); 
  }
  export default TimetableDisplay;
  

function renderTimeIndicator(date, earliestHour, timeIndicatorRef){
    const offset = date.hour + date.minute/60 - earliestHour;

    return (
        <div ref={timeIndicatorRef} className={styles.currentTimeIndicator+' bg-primary border-primary'} style={{top: offset*4.5+"rem"}}>
            <div className={styles.currentTimeIndicatorLabel+' bg-primary text-light rounded px-1'}>{date.toLocaleString(DateTime.TIME_24_SIMPLE)}</div>
        </div>
    );

}

function generateTimeblocks(noOfBlocks){
    const timeblocks = [];
    
    for(let i = 0; i < noOfBlocks; i++){
        timeblocks.push(<div key={uuidv4()} className={styles.timeblock+ " border-bottom"}></div>);
    }

    return timeblocks;
}

function generateTimelist(earliestHour, latestHour){
    const timelist = [];
    
    for(let i = 0; i <= latestHour-earliestHour; i++){
        timelist.push(<div key={uuidv4()} className={styles.timeblock+ " border-bottom text-end p-0 pe-1"}>
            {earliestHour + i + ':00'}
        </div>);
    }

    return timelist;
}
