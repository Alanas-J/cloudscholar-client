import './Navigation.css';

import { useSelector, useDispatch } from 'react-redux';
import { setDisplay } from '../../../state/slices/appDisplay';

function NavigationBar() {

  const appDisplay = useSelector(state => state.appDisplay.value);
  const dispatch = useDispatch();

    const navButtonStyle = "nav-link py-3 border-bottom";

    return (
      <div className='navigationBar d-flex flex-column flex-shrink-0  bg-light'>
        <ul className="nav nav-pills nav-flush flex-column mb-auto text-center ">

          <li className="nav-item my-2">
            <a href="#" className={appDisplay == "home" ? "active "+navButtonStyle : navButtonStyle} 
            onClick={() => dispatch(setDisplay("home"))}>
              Home
            </a>

            <a href="#" className={appDisplay == "timetable" ? "active "+navButtonStyle : navButtonStyle} 
            onClick={() => dispatch(setDisplay("timetable"))}>
              Timetable
            </a>

            <a href="#" className="nav-link py-3 border-bottom" aria-current="page" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
              Notes
            </a>
            <a href="#" className="nav-link  py-3 border-bottom" aria-current="page" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
              Grade Calculator
            </a>
          </li>
        </ul>

        <div className="dropdown ">
        </div>


      </div>

    ); 
  }
  export default NavigationBar;
  