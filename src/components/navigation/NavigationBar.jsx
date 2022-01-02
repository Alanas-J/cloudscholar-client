import './navigation.css'
function NavigationBar() {
    return (
      <div className='navigationBar d-flex flex-column flex-shrink-0 bg-light border-right'>
        <ul class="nav nav-pills nav-flush flex-column mb-auto text-center ">

          <li class="nav-item">
            <a href="#" class="nav-link active py-3 border-bottom" aria-current="page" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
              Home
            </a>
            <a href="#" class="nav-link py-3 border-bottom " aria-current="page" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
              Timetable
            </a>
            <a href="#" class="nav-link py-3 border-bottom" aria-current="page" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
              Notes
            </a>
            <a href="#" class="nav-link  py-3 border-bottom" aria-current="page" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
              Grade Calculator
            </a>
          </li>
        </ul>

        <div class="dropdown border-top">
        </div>


      </div>

    ); 
  }
  export default NavigationBar;
  