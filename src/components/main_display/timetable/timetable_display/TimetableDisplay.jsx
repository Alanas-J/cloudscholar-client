import styles from "./TimetableDisplay.module.css"

function TimetableDisplay() {

    //Defaults
    let earliestHour = 9;
	let latestHour = 16;


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
                    <div className={styles.timeblock+ " border-bottom"}>9</div>
                    <div className={styles.timeblock+ " border-bottom"}>10</div>
                    <div className={styles.timeblock+ " border-bottom"}>11</div>
                    <div className={styles.timeblock+ " border-bottom"}>12</div>
                    <div className={styles.timeblock+ " border-bottom"}>13</div>
                    <div className={styles.timeblock+ " border-bottom"}>14</div>
                    <div className={styles.timeblock+ " border-bottom"}>15</div>
                    <div className={styles.timeblock+ " border-bottom"}>16</div>
                    <div className={styles.timeblock+ " border-bottom"}>17</div>
                    <div className={styles.timeblock+ " border-bottom"}>18</div>
                    <div className={styles.timeblock+ " border-bottom"}>19</div>
                    <div className={styles.timeblock+ " border-bottom"}>20</div>
                    <div className={styles.timeblock+ " border-bottom"}>21</div>
                    <div className={styles.timeblock+ " border-bottom"}>22</div>
                    <div className={styles.timeblock+ " border-bottom"}>23</div>
                    <div className={styles.timeblock+ " border-bottom"}>24</div>
                    <div className={styles.timeblock+ " border-bottom"}></div>
                    <div className={styles.timeblock+ " border-bottom"}></div>
                    <div className={styles.timeblock+ " border-bottom"}></div>
                    <div className={styles.timeblock+ " border-bottom"}></div>
                </div>
                <div className="col border p-0">
                    

                </div>
                <div className="col border p-0">
                  
                </div>
                <div className="col border p-0">
                   
                </div>
                <div className="col border p-0">
                 
                </div>
                <div className="col border p-0">
                  
                </div>
                <div className="col border p-0">
              
                </div>
                <div className="col border p-0">
             
                </div>
            </div>
        </div>
        


    ); 
  }
  export default TimetableDisplay;
  