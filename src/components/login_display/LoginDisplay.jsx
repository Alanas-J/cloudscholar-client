import { useState } from 'react';
import axios from 'axios';
import styles from  './LoginDisplay.module.css';
import {useDispatch} from 'react-redux';
import fetchUserData from '../../utility/requests/fetchUserData';

function LoginDisplay({setLoggedIn}) {
    const [displayState, setDisplayState] = useState({
        formSubmitted: false,
        error: false,
        invalidEmail: false,
        errorMessage: "Auth failure error goes here.",
        submitted: false,
    });
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [keepUserSigned, setKeepUserSigned] = useState(false);

    // Redux State
    const dispatch = useDispatch();
    
    // Component State    
    if(displayState.invalidEmail && validateEmail(email)){
        displayState.invalidEmail = false;
        setDisplayState(displayState);
    }

    function handleSubmit(event){
        event.preventDefault();
        const state = {...displayState};

        state.error = false;
        state.invalidEmail = !validateEmail(email);

        if(!state.invalidEmail){
            state.formSubmitted = true;
            authenticate(email, password, keepUserSigned, displayState, setDisplayState, dispatch);
        }
        setDisplayState(state);
    }

    return (
        <div className={styles.loginDisplay+' '}>
            <main className={styles.formSignin+' d-flex flex-column justify-content-center'}>
                <form className='pb-5'>

                    <div className="logo text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#444455" className="bi bi-mortarboard-fill" viewBox="0 0 16 16">
                            <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z"/>
                            <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Z"/>
                        </svg>
                    </div>
                    
                    <h1 className="display-5 mb-3 fw-normal text-center">CloudScholar</h1>

                    {displayState.error &&
                        <div className="auth-error-div">
                            <div className="alert alert-danger mb-1 py-2" role="alert">
                                {displayState.errorMessage}
                            </div>
                        </div>
                    }

                    <div className="login-inputs">
                        <div className="form-floating my-1">
                            <input disabled={displayState.formSubmitted} type="email" className={(displayState.invalidEmail && 'is-invalid')+' form-control'} id="floatingInput" placeholder="name@example.com" onChange={e => setEmail(e.target.value)}/>
                            <label htmlFor="floatingInput">Email address</label>
                            
                            {displayState.invalidEmail &&
                                <div id="validationServerUsernameFeedback" className="text-left invalid-feedback mb-2 ms-2">
                                    Please enter valid email. Eg. 'person@mail.com'.
                                </div>
                            }  
                        </div>

                        
                        <div className="form-floating my-1">
                            <input disabled={displayState.formSubmitted} type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="checkbox mb-3 text-center">
                        <label >
                            <input disabled={displayState.formSubmitted} className='form-check-input' role="button" type="checkbox" onChange={e => setKeepUserSigned(e.target.checked)}/> Keep me signed in
                        </label>
                        </div>
                        <button disabled={displayState.formSubmitted} className="w-100 btn btn-lg btn-primary" 
                            onClick={handleSubmit}>
                            {!displayState.formSubmitted? "Sign in" : "Signing in..."}
                        </button>
                        <div className='text-center'>
                            <p className={styles.link} onClick={() => openRegistration()}>Don't have an account? Register Here</p>
                        </div>
                        
                    </div>
                    
                </form>
            </main>
        </div>); 
}
export default LoginDisplay;

  
function validateEmail(email){
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)){

        return true;
    } else {
        return false;
    }
}

async function authenticate(email, password, keepUserSigned, state, setDisplayState, dispatch){
 
    try {
        const response = await axios.post('http://localhost:8086/login', {
            email: email,
            password: password,
        });

        // Store token 
        if(keepUserSigned){
            window.localStorage.setItem('token', response.data.token);
            window.sessionStorage.setItem('refresh_token', response.data.refresh_token);
        }
        window.sessionStorage.setItem('token', response.data.token);
        window.localStorage.setItem('refresh_token', response.data.refresh_token);

        await fetchUserData(dispatch);

        return;
    } catch (error) {
        state.error = true;

        // Actual error
        if(error.message === 'Network Error'){
            state.errorMessage = "Connection to the login server failed...";
        } else if (error.response.data.message){
            state.errorMessage = error.response.data.message;
        } else{
            error.message = 'An unknown error has occured.'
        }
        console.log({error: error});
    }
    state.formSubmitted = false;
    setDisplayState(state);
}

function openRegistration(){

}