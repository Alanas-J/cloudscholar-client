import './Timetable.css'
function Timetable() {
    return (
      <div className='home rounded-left d-flex flex-fill justify-content-between'>
      
        <section className='flex-fill'>
        <h1 className='border-bottom p-3'>Timetable</h1>


        <Timetable 
          events={{
            monday: [
              {
                id: 1,
                name: "Custom Event 1",
                type: "custom",
                startTime: new Date("2018-02-23T11:30:00"),
                endTime: new Date("2018-02-23T13:30:00"),
              },
            ],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
          }}
        />
      
        </section>

        <section className='shortcuts p-4 border border-top-0'>
         dsfgsdfg

        </section>

        sadfsdf

          
      </div>

    ); 
  }
  export default Timetable;
  