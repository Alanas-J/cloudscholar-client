import styles from './NavigationBar.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDisplay } from '../../../state/slices/appDisplay';
import { updateUserState } from '../../../state/slices/userState';

function NavigationBar() {
    // Global State
    const appDisplay = useSelector(state => state.appDisplay.value);
    const dispatch = useDispatch();

    // Component State
    const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

    // Unfocus Dropdown
    if(showSettingsDropdown){
        document.getElementById("root").onclick = () => dropdownClick(showSettingsDropdown, setShowSettingsDropdown);
    } else {
        document.getElementById("root").onclick = null;
    }

    const navButtonStyle = "nav-link py-3 border-bottom";
    // Need to remove this jank^

    return (
        <div className={styles.navigationBar+' d-flex flex-column flex-shrink-0  bg-light'}>
            <ul className="nav nav-pills nav-flush flex-column mb-auto text-center ">
                <li className="nav-item my-2">
                    <button className={appDisplay === "home" ? "active "+navButtonStyle : navButtonStyle} 
                    onClick={() => dispatch(setDisplay("home"))}>
                        Home
                    </button>

                    <button className={appDisplay === "timetable" ? "active "+navButtonStyle : navButtonStyle} 
                    onClick={() => dispatch(setDisplay("timetable"))}>
                        Timetable
                    </button>

                    <button className="nav-link py-3 border-bottom">
                        Notes
                    </button>

                    <button href="#" className="nav-link py-3 border-bottom">
                        Grade Calculator
                    </button>
                </li>
            </ul>

            <div className="dropdown border-top nav-item nav-pills">
                <button onClick={() => dropdownClick(showSettingsDropdown, setShowSettingsDropdown)} className="d-flex py-4 nav-link bg-light align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" >
                    Settings
                </button>
                {showSettingsDropdown && 
                <ul  className={styles.dropdownList+" dropdown-menu text-small shadow d-block"}>
                    <li><button className="dropdown-item">Profile(Placeholder)</button></li>
                    <li><button className="dropdown-item">Settings(Placeholder)</button></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><button className="dropdown-item" onClick={() => signout(dispatch)}>Sign out</button></li>
                </ul>}
            
            </div>
        </div>); 
  }
export default NavigationBar;

function dropdownClick(showSettingsDropdown, setShowSettingsDropdown){
    setShowSettingsDropdown(!showSettingsDropdown);
}

function signout(dispatch){
    window.sessionStorage.clear();
    dispatch(updateUserState({loggedIn: false}));
}
  