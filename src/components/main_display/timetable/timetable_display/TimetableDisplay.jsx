import styles from "./TimetableDisplay.module.css"

function TimetableDisplay() {

    //Defaults
    let earliestHour = 9;
	let latestHour = 16;

    // 9 16


    //TODO: Get the week'

    return (
        
        <div className={styles.timetableDisplay}>

            <div className=" row  mb-3">

                <div className="col-4 bg-light mx-a border">
                    <div className="row text-center">

                        <div className="col-1 p-0">
                            <button type="button" className="btn btn-primary m-0">&lt;</button>
                        </div>


                        <div className="col align-items-center">
                            <h5 className="m-0 p-1 mt-1">
                                25th - 31st, March 2022
                            </h5>
                        </div>

                        <div className="col-1 p-0">
                            <button type="button" className="btn btn-primary">&gt;</button>
                        </div>

                    </div>
                </div>
            
            </div>


            <div className="row rounded-top text-center border-dark border bg-light">
                <div className="col border">

                </div>
                <div className="col border">
                    <div>Moday</div>
                </div>
                <div className="col border">
                    <div>Tuesday</div>
                </div>
                <div className="col border">
                    <div>Wednesday</div>
                </div>
                <div className="col border">
                    <div>Thursday</div>
                </div>
                <div className="col border">
                    <div>Friday</div>
                </div>
                <div className="col border">
                    <div>Saturday</div>
                </div>
                <div className="col border">
                    <div>Sunday</div>
                </div>
            </div>
            <div className={styles.display + " row text-center border-dark border-start border-bottom border-end bg-light"}>
                <div className="col border p-0">
                    {generateTimelist(earliestHour, latestHour)}
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
