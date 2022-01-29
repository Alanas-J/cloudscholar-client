import './Home.css'
function Home() {
    return (
      <div className='home rounded-left d-flex flex-fill'>
      
        <section className='flex-fill h-100'>

        <div className='row  h-100 p-0 pt-2'>
          <div className="col">
            <div className='scheduleComponent mx-4'>
              <div className="row border-bottom">
                <div className="col">
                  <h2 className='p-2 '>Today's Classes</h2>
                </div>
                
                <div className="col-1 d-flex justify-content-end"><button type="button" class="btn btn-primary">+</button></div>
              </div>
              <div className='mx-4'> display will go here</div>
            </div>
          </div>


          <div className="col">
            <div className='scheduleComponent mx-4'>
              <div className="row border-bottom">
                <div className="col">
                  <h2 className='p-2 '>Upcoming Tasks</h2>
                </div>
                
                <div className="col-1 d-flex justify-content-end"><button type="button" class="btn btn-primary">+</button></div>
              </div>
              <div className='mx-4'> display will go here</div>
            </div>
          </div>
          

          
        
        </div>
        </section>

        <section className='shortcuts p-4 border border-top-0'>
          <div className="row">
            <div className="col">
              <h4 className='border-bottom'>Quick Shortcut URLs</h4>
              <a href="" className='link-secondary'>Add new url...</a>
              
              
            </div>
          <div className="col-1">
            
          </div>
        </div>
          
        </section>

          
      </div>

    ); 
  }
  export default Home;
  