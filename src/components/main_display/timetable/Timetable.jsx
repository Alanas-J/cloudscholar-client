import './Timetable.css'
import TimetableDisplay from './timetable_display/TimetableDisplay'

function Timetable() {
    return (
      <div className='home rounded-left d-flex flex-fill justify-content-between'>
      
        <section className='flex-fill'>
          <h2 className='border-bottom p-3'>Timetable</h2>


			<div className="p-4 pt-2">
				<TimetableDisplay></TimetableDisplay>
			</div>
          

        </section>




        <section className='shortcuts p-4 border border-top-0'>

        </section>

          
      </div>

    ); 
  }
  export default Timetable;
  