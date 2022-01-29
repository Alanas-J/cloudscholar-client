import styles from './Home.module.css'

function Home() {
    return (
      <div className={styles.home+" container-fluid border"}>
        
        {/* Main row*/} 
        <div className='row h-100'>

          {/* Flex Column and Row containing Today's and Upcoming */} 
          <div className='col h-100'>
            <div className='row h-100'>


              {/* Today's Classes Col*/} 
              <div className="col-6 pt-2 mw-30 border-end">
                <div className='scheduleComponent mx-4'>

                  <div className="row border-bottom">
                    <div className="col-12 d-flex justify-content-between">
                      <h2 className='p-1 '>Today's Classes</h2>
                      <button type="button" class="btn btn-primary">+</button>
                    </div>
                  </div>

                  {/* Output Display To go Here*/} 
                  <div className='mx-4'> display will go here</div>

                </div>
              </div>

              {/* Upcoming Tasks Col*/} 
              <div className="col-6 pt-2 border-left">
                <div className='scheduleComponent mx-4'>
                  <div className="row border-bottom">
                    <div className="col-12 d-flex justify-content-between">
                      <h2 className='p-1 '>Upcoming Tasks</h2>
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
          <div className={styles.shortcuts+" border-start"}>
            <div className="row">
              <div className="col">
                <h4 className='border-bottom'>Quick Shortcut URLs</h4>
                <a href="" className='link-secondary'>Add new url...</a>
              </div>
            </div>
          </div>


        </div>
      </div>

    ); 
  }
  export default Home;
  