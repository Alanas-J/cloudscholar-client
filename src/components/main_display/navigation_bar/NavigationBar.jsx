import styles from './NavigationBar.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDisplay } from '../../../state/slices/appDisplay';
import { updateUserState } from '../../../state/slices/userState';
import { clearCheckingInterval } from '../../../utility/notifications/notificationService';

function NavigationBar() {
    const appDisplay = useSelector(state => state.appDisplay.value);
    const dispatch = useDispatch();


    const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

    if(showSettingsDropdown){
        document.getElementById("root").onclick = () => dropdownClick(showSettingsDropdown, setShowSettingsDropdown);
    } else {
        document.getElementById("root").onclick = null;
    }

    const navButtonStyle = "nav-link my-2 border-bottom rounded-0";

    return (
        <div className={styles.navigationBar+' d-flex flex-column flex-shrink-0  bg-light shadow'}>
            <ul className="nav nav-pills nav-flush flex-column mb-auto text-center ">
                <li className="nav-item my-2">
                    <button className={appDisplay === "home" ? "active "+navButtonStyle : navButtonStyle} 
                    onClick={() => dispatch(setDisplay("home"))}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="90%" height="90%" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
                        </svg>
                    </button>

                    <button className={appDisplay === "timetable" ? "active "+navButtonStyle : navButtonStyle} 
                    onClick={() => dispatch(setDisplay("timetable"))}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="90%" height="90%" fill="currentColor" className="bi bi-calendar-range" viewBox="0 0 16 16">
                            <path d="M9 7a1 1 0 0 1 1-1h5v2h-5a1 1 0 0 1-1-1zM1 9h4a1 1 0 0 1 0 2H1V9z"/>
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                        </svg>
                    </button>

                    <button disabled className="nav-link py-3 border-bottom">
                        ...
                    </button>
                </li>
            </ul>

            <div className="dropdown border-top nav-item nav-pills ps-2 pt-2">
                <button onClick={() => dropdownClick(showSettingsDropdown, setShowSettingsDropdown)} className="d-flex pb-4 pt-3 nav-link bg-light align-items-center justify-content-center p-1 link-dark text-decoration-none dropdown-toggle" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="60%"  fill="#555555" className="bi bi-gear-fill" viewBox="0 0 16 16">
                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                    </svg>
                </button>
                {showSettingsDropdown && 
                <ul  className={styles.dropdownList+" dropdown-menu text-small shadow d-block"}>
                    <li><button className="dropdown-item">Import Timetable (TBD)</button></li>
                    <li><button className="dropdown-item">Export Timetable (TBD)</button></li>
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
    window.localStorage.clear();
    clearCheckingInterval();
    dispatch(updateUserState({loggedIn: false}));
}
  