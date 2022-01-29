import styles from './Home.module.css'
import AddClassModal from '../../modals/AddClassModal';
import React, {useState} from "react";

function Home() {
    // Will need multiple of these for each modal to be displayed.
    const [showAddClassModal, setShowAddClassModal] = useState(false);
    const handleCloseAddClassModal = () => setShowAddClassModal(false);
    const handleShowAddClassModal = () => setShowAddClassModal(true);



    return (
      <div className={styles.home+" container-fluid border-start border-end"}>
        
        {/* Main row*/} 
        <div className='row h-100'>

          {/* Flex Column and Row containing Today's and Upcoming */} 
          <div className='col h-100'>
            <div className='row h-100'>


              {/* Today's Classes Col*/} 
              <div className="col-6 pt-4 mw-30 border-end">
                <div className='scheduleComponent mx-4'>

                  <div className="row border-bottom mb-2">
                    <div className="col-12 d-flex justify-content-between pb-1">
                      <h3 className='p-1 '>Today's Classes</h3>
                      <button type="button" class="btn btn-primary" onClick={handleShowAddClassModal}>+</button>
                    </div>
                  </div>

                  {/* Output Display To go Here*/} 
                  <div className='mx-4'> display will go here</div>

                </div>
              </div>

              {/* Upcoming Tasks Col*/} 
              <div className="col-6 pt-4 border-left">
                <div className='scheduleComponent mx-4'>
                  <div className="row border-bottom mb-2">
                    <div className="col-12 d-flex justify-content-between pb-1">
                      <h3 className='p-1 '>Upcoming Tasks</h3>
                      <button type="button" class="btn btn-primary">+</button>
                    </div>
                  </div>

                   {/* Output Display To go Here*/} 
                  <div className='mx-4'> display will go here</div>
                </div>
              </div>
              

            </div>
          </div>

          {/* Quick Shortcuts */} 
          <div className={styles.shortcuts+" border-start pt-2 "}>
            <div className="row">
              <div className="col">

                <div className="d-flex border-bottom mb-2 justify-content-start pb-1 mb-2">
                <h5 className='col'>Quick Shortcut URLs</h5>
                <button type="button" class="col-1 p-1 btn btn-secondary">+</button>
                </div>
                
                <a href="" className='link-secondary'>Add new url...</a>
              </div>
            </div>
          </div>


        </div>

        {/* ALL OF THE HOMEPAGE MODALS ========================== */} 
        <AddClassModal show={showAddClassModal} handleClose={handleCloseAddClassModal}/>

      </div>
    ); 
  }
  export default Home;
  