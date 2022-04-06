import styles from './Home.module.css'

// Redux state
import { useDispatch } from 'react-redux';
import { openModal } from '../../../state/slices/modalState'
import UpcomingTasksDisplay from './upcoming_tasks/UpcomingTasksDisplay';
import TodaysClassesDisplay from './todays_classes/TodaysClassesDisplay';

function Home() {
    const dispatch = useDispatch();


    return (
        <div className={styles.home + " container-fluid"}>
            <div className='row h-100'>

                <div className='col h-100'>
                    <div className='row h-100'>

                        <div className="col-6 mw-30 border-end">
                            <div className='scheduleComponent pt-4 mx-2 h-100'>
                                <div className="row border-bottom border-secondary mb-2">
                                    <div className="col-12 d-flex justify-content-between pb-1">
                                        <h3 className='p-1 '>Today's Classes</h3>
                                        <button type="button" className="btn btn-primary" onClick={() => dispatch(openModal({ name: 'AddClass' }))}>+</button>
                                    </div>
                                </div>
                                <TodaysClassesDisplay />
                            </div>
                        </div>

                        <div className="col-6 border-left">
                            <div className='scheduleComponent pt-4 mx-2 h-100'>
                                <div className="row border-bottom border-secondary mb-2">
                                    <div className="col-12 d-flex justify-content-between pb-1">
                                        <h3 className='p-1 '>Upcoming Tasks</h3>
                                        <button type="button" className="btn btn-primary" onClick={() => dispatch(openModal({ name: 'AddTask' }))}>+</button>
                                    </div>
                                </div>
                                <UpcomingTasksDisplay />
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div className={styles.shortcuts + " border-start pt-2 bg-light shadow"}>
                    <div className="row">
                        <div className="col">
                            <div className="d-flex border-bottom border-secondary mb-2 justify-content-start pb-1 mb-2">
                                <h5 className='col'>Quick Shortcut URLs</h5>
                                <button type="button" className="col-1 p-1 btn btn-secondary" onClick={() => dispatch(openModal({ name: 'AddQuickShortcut' }))}>+</button>
                            </div>
                            <p className='link-secondary'>Add new url...</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default Home;
