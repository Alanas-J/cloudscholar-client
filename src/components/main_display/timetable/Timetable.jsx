import './Timetable.css'
import TimetableDisplay from './timetable_display/TimetableDisplay'

function Timetable() {
    return (
      <div className='home rounded-left d-flex flex-fill justify-content-between'>
      
        <section className='flex-fill'>
          <h3 className='border-bottom border-dark p-3 mx-4 pt-4'>Timetable</h3>


			<div className="p-4 pt-2 pb-0">
				<TimetableDisplay></TimetableDisplay>
			</div>
          

        </section>




        <section className='shortcuts p-4 border border-top-0 shadow bg-white'>

        </section>

          
      </div>

    ); 
  }
  export default Timetable;
  