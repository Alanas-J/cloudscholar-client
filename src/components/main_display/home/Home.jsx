import styles from './Home.module.css'

// Redux state
import {useDispatch} from 'react-redux';
import {openModal} from '../../../state/slices/modalState'
import UpcomingTasksDisplay from './upcoming_tasks/UpcomingTasksDisplay';
import TodaysClassesDisplay from './todays_classes/TodaysClassesDisplay';

function Home() {
    const dispatch = useDispatch();


    return (
      <div className={styles.home+" container-fluid"}>
        
        {/* Main row*/} 
        <div className='row h-100'>

          {/* Flex Column and Row containing Today's and Upcoming */} 
          <div className='col h-100'>
            <div className='row h-100'>


              {/* Today's Classes Col*/} 
              <div className="col-6 mw-30 border-end">
                <div className='scheduleComponent pt-4 mx-4 h-100'>

                  <div className="row border-bottom border-secondary mb-2">
                    <div className="col-12 d-flex justify-content-between pb-1">
                      <h3 className='p-1 '>Today's Classes</h3>
                      <button type="button" className="btn btn-primary" onClick={() => dispatch(openModal('AddClass'))}>+</button>
                    </div>
                  </div>

                  {/* Output Display To go Here*/} 
                  <TodaysClassesDisplay/>

                </div>
              </div>

              {/* Upcoming Tasks Col*/} 
              <div className="col-6 border-left">
                <div className='scheduleComponent pt-4 mx-4 h-100'>
                  <div className="row border-bottom border-secondary mb-2">
                    <div className="col-12 d-flex justify-content-between pb-1">
                      <h3 className='p-1 '>Upcoming Tasks</h3>
                      <button type="button" className="btn btn-primary">+</button>
                    </div>
                  </div>

                   {/* Output Display To go Here*/} 
                  <UpcomingTasksDisplay/>

                </div>
              </div>
              

            </div>
          </div>

          {/* Quick Shortcuts */} 
          <div className={styles.shortcuts+" border-start pt-2 bg-light "}>
            <div className="row">
              <div className="col">

                <div className="d-flex border-bottom border-secondary mb-2 justify-content-start pb-1 mb-2">
                <h5 className='col'>Quick Shortcut URLs</h5>
                <button type="button" className="col-1 p-1 btn btn-secondary">+</button>
                </div>
                
                <a href="" className='link-secondary'>Add new url...</a>
              </div>
            </div>
          </div>


        </div>
      </div>
    ); 
  }
  export default Home;
  