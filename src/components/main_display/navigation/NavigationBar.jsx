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

        <div className="dropdown border-top">
          <a href="#" className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
            Settings
          </a>
          <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
            <li><a className="dropdown-item" href="#">New project...</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>

      </div>

    ); 
  }
  export default NavigationBar;
  