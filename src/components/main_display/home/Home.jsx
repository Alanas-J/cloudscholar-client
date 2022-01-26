import './Home.css'
function Home() {
    return (
      <div className='home rounded-left d-flex flex-fill justify-content-between'>
      
        <section className='flex-fill'>
        <h1 className='border-bottom p-3'>Welcome User</h1>

        <div className=''>
          <div className='scheduleComponent mx-4'>
            <h2 className='border-bottom p-2 '>Today's Schedule</h2>
            <div className='mx-4'> display will go here</div>
          </div>

          <div className='taskComponent mx-4'>
            <h2 className='border-bottom p-2 '> Additional Upcoming Tasks</h2>
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
  