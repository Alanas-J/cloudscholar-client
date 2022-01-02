import './home.css'
function Home() {
    return (
      <div className='home bg-light rounded-left d-flex justify-content-between'>
      
        <section className='flex-fill'>
        <h1 className='border-bottom p-3'>Welcome User</h1>

        <div className='d-flex justify-content-around'>
          <div className='scheduleComponent mx-4'>
            <h2 className='border-bottom p-2 '>Today's Schedule</h2>
            <div className='mx-4'> display will go here</div>
          </div>

          <div className='taskComponent mx-4'>
            <h2 className='border-bottom p-2 '>Tasks</h2>
            <div className='mx-4'> display will go here</div>
          </div>

        
        </div>
        </section>

        <section className='shortcuts p-4 border border-top-0'>
          <h4 className='border-bottom'>Quick Shortcut URLs</h4>
        </section>

          
      </div>

    ); 
  }
  export default Home;
  