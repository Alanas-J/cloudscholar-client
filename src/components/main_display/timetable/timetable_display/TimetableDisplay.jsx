import styles from './TimetableDisplay.module.css'
import {useState, useRef, useEffect} from 'react';
import {DateTime, Interval} from 'luxon';
import {v4 as uuidv4} from 'uuid';

function TimetableDisplay() {

    const [date, setDate] = useState(DateTime.now());
    const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

    const startOfTheWeek = date.minus({days: date.weekday-1});
    const endOfTheWeek = date.plus({days: 7-date.weekday});

    console.log(date);
    console.log("date.weekday");
    console.log(date.weekday);


    //Defaults
    let earliestHour = 9;
	let latestHour = 18;

    // 9 16
    const timeIndicatorRef = useRef();
    useEffect(() => {
        if(timeIndicatorRef.current)
            timeIndicatorRef.current.scrollIntoView({block: "center"});
    });
    
    

    //TODO: Get the current week and monday and sunday dates within.
    // add functionality to change
    // Refetch table data based on this (date will be a usestate)

    // each timetable element will most likely be created from an object.

    // need to figure a out a system for intersecting timetable objects.

    // current time indicator.


    return (
        
        <div className={styles.timetableDisplay}>
            <div className=" ms-1 mb-3">
                 <div className="d-inline-flex bg-light rounded border">

                    <div className="p-0 border">
                        <button type="button border" className="btn btn-primary m-0">&lt;</button>
                    </div>
                    <div className="p-0 border">
                        <button type="button" className="btn btn-primary">&gt;</button>
                    </div>

                    <div className="align-items-center">
                        <h5 className="m-0 p-1 mt-1  px-3 ">
                            {startOfTheWeek.day} {startOfTheWeek.monthShort} - {endOfTheWeek.day} {endOfTheWeek.monthShort}, {endOfTheWeek.year}
                        </h5>
                    </div>
                </div>
            </div>


            <div className="row mx-1 p-2 rounded-top text-center border bg-primary text-white">
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
                <div className="col me-2">
                    <div>Sunday</div>
                </div>
            </div>

            <div className={styles.display + " row mx-1 text-center border-start border-bottom border-end bg-light"}>
                <div className={styles.timeCol+" col border p-0"}>
                    {generateTimelist(earliestHour, latestHour)}
                </div>
                <div className="col border p-0">
                    <div className={styles.timeOffset}>
                        {(date.weekday === 1 && currentWeekOffset === 0 && date.hour >= earliestHour && date.hour < latestHour) && renderTimeIndicator(date, earliestHour, timeIndicatorRef)}
                    </div>
                    {generateTimeblocks(latestHour-earliestHour+1)}   
                </div>
                <div className="col border p-0">
                    <div className={styles.timeOffset}>
                        {(date.weekday === 2 && currentWeekOffset === 0 && date.hour >= earliestHour && date.hour < latestHour) && renderTimeIndicator(date, earliestHour, timeIndicatorRef)}
                    </div>
                    {generateTimeblocks(latestHour-earliestHour+1)}
                </div>
                <div className="col border p-0">
                    <div className={styles.timeOffset}>
                        {(date.weekday === 3 && currentWeekOffset === 0 && date.hour >= earliestHour && date.hour < latestHour) && renderTimeIndicator(date, earliestHour, timeIndicatorRef)}
                    </div>
                    {generateTimeblocks(latestHour-earliestHour+1)}
                </div>
                <div className="col border p-0">
                    <div className={styles.timeOffset}>
                        {(date.weekday === 4 && currentWeekOffset === 0 && date.hour >= earliestHour && date.hour < latestHour) && renderTimeIndicator(date, earliestHour, timeIndicatorRef)}
                    </div>
                    {generateTimeblocks(latestHour-earliestHour+1)}
                </div>
                <div className="col border p-0">
                    <div className={styles.timeOffset}>
                        {(date.weekday === 5 && currentWeekOffset === 0 && date.hour >= earliestHour && date.hour < latestHour) && renderTimeIndicator(date, earliestHour, timeIndicatorRef)}
                    </div>
                    {generateTimeblocks(latestHour-earliestHour+1)}  
                </div>
                <div className="col border p-0">
                    <div className={styles.timeOffset}>
                        {(date.weekday === 6 && currentWeekOffset === 0 && date.hour >= earliestHour && date.hour < latestHour) && renderTimeIndicator(date, earliestHour, timeIndicatorRef)}
                    </div>
                    {generateTimeblocks(latestHour-earliestHour+1)}
                </div>
                <div className="col border p-0">
                    <div className={styles.timeOffset}>
                        {(date.weekday === 7 && currentWeekOffset === 0 && date.hour >= earliestHour && date.hour < latestHour) && renderTimeIndicator(date, earliestHour, timeIndicatorRef)}
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
        <div ref={timeIndicatorRef} className={styles.currentTimeIndicator+' bg-primary border-primary'} style={{top: offset*5+"rem"}}>
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
