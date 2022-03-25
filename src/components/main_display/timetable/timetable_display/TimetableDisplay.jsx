import styles from "./TimetableDisplay.module.css"

function TimetableDisplay() {

    //Defaults
    let earliestHour = 9;
	let latestHour = 18;

    // 9 16


    //TODO: Get the current week and monday and sunday dates within.
    // add functionality to change
    // Refetch table data based on this (date will be a usestate)

    // each timetable element will most likely be created from an object.

    // need to figure a out a system for intersecting timetable objects.

    // current time indicator.


    return (
        
        <div className={styles.timetableDisplay}>

            <div className="mb-3">

                 <div className="d-inline-flex bg-light rounded border">

                        <div className="p-0 border">
                            <button type="button border" className="btn btn-primary m-0">&lt;</button>
                        </div>
                        <div className="p-0 border">
                            <button type="button" className="btn btn-primary">&gt;</button>
                        </div>


                        <div className="align-items-center">
                            <h5 className="m-0 p-1 mt-1  px-3 ">
                                25th - 31st, March 2022
                            </h5>
                        </div>

                        

                    </div>
            
            </div>


            <div className="row rounded-top text-center border bg-primary text-white">
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
            <div className={styles.display + " row text-center border-start border-bottom border-end bg-light"}>
                <div className={styles.timeCol+" col border p-0"}>
                    {generateTimelist(earliestHour, latestHour)}
                </div>
                <div className="col border p-0">
                    <div className={styles.timeOffset}>
                            <div className={styles.test}>
                                test</div>
                    </div>
                    {generateTimeblocks(latestHour-earliestHour+1)}   
                </div>
                <div className="col border p-0">
                    {generateTimeblocks(latestHour-earliestHour+1)}
                </div>
                <div className="col border p-0">
                    {generateTimeblocks(latestHour-earliestHour+1)}
                </div>
                <div className="col border p-0">
                    {generateTimeblocks(latestHour-earliestHour+1)}
                </div>
                <div className="col border p-0">
                    {generateTimeblocks(latestHour-earliestHour+1)}  
                </div>
                <div className="col border p-0">
                    {generateTimeblocks(latestHour-earliestHour+1)}
                </div>
                <div className="col border p-0">
                    {generateTimeblocks(latestHour-earliestHour+1)}
                </div>
            </div>
        </div>
        


    ); 
  }
  export default TimetableDisplay;
  

function generateTimeblocks(noOfBlocks){
    const timeblocks = [];
    
    for(let i = 0; i < noOfBlocks; i++){
        timeblocks.push(<div className={styles.timeblock+ " border-bottom"}></div>);
    }

    return timeblocks;
}

function generateTimelist(earliestHour, latestHour){
    const timelist = [];
    
    for(let i = 0; i <= latestHour-earliestHour; i++){
        timelist.push(<div className={styles.timeblock+ " border-bottom text-end p-0 pe-1"}>
            {earliestHour + i + ':00'}
        </div>);
    }

    return timelist;
}
