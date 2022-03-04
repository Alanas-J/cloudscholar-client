import { useState } from 'react';
import { isEqual } from 'lodash';
import styles from  './LoginDisplay.module.css'

function LoginDisplay({setLoggedIn}) {

    const [displayState, setDisplayState] = useState({
        loginButtonEnabled: true,
        error: false,
        invalidEmail: false,
        errorMessage: "Auth failure error goes here.",
        submitted: false
    });
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [keepUserSigned, setKeepUserSigned] = useState(false);

    console.log(displayState);

    handleLoginState(displayState, setDisplayState, email, password, keepUserSigned);

    return (
        <div className={styles.loginDisplay+' '}>
            <main className={styles.formSignin+' d-flex flex-column justify-content-center'}>
                <form className='pb-5'>

                    <div className="logo text-center">
                        <img className="mb-4 text-center" src={require('./logo192.png')} alt="" width="72" height="57"/>
                    </div>
                    
                    <h1 className="display-5 mb-3 fw-normal text-center">CloudScholar</h1>

                    {displayState.error &&
                        <div className="auth-error-div">
                            <div class="alert alert-danger mb-1" role="alert">
                                {displayState.errorMessage}
                            </div>
                        </div>
                    }

                    <div className="login-inputs">
                        <div className="form-floating my-1">
                            <input disabled={!displayState.loginButtonEnabled} type="email" className={(displayState.invalidEmail && 'is-invalid')+' form-control'} id="floatingInput" placeholder="name@example.com" onChange={e => setEmail(e.target.value)}/>
                            <label htmlFor="floatingInput">Email address</label>
                            
                            {displayState.invalidEmail &&
                                <div id="validationServerUsernameFeedback" className="text-left invalid-feedback mb-2 ms-2">
                                    Please enter valid email. Eg. 'person@mail.com'.
                                </div>
                            }  
                        </div>

                        
                        <div className="form-floating my-1">
                            <input disabled={!displayState.loginButtonEnabled} type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="checkbox mb-3 text-center">
                        <label >
                            <input disabled={!displayState.loginButtonEnabled} className='form-check-input' role="button" type="checkbox" onChange={e => setKeepUserSigned(e.target.checked)}/> Keep me signed in
                        </label>
                        </div>
                        <button disabled={!displayState.loginButtonEnabled} className="w-100 btn btn-lg btn-primary" 
                            onClick={(e) => {setDisplayState({...displayState, submitted: true}); e.preventDefault();}}>
                            {displayState.loginButtonEnabled? "Sign in" : "Signing in..."}
                        </button>
                        <div className='text-center'>
                            <a className={styles.link} onClick={() => openRegistration()}>Don't have an account? Register Here</a>
                        </div>
                        
                    </div>
                    
                </form>
            </main>
        </div>); 
}
export default LoginDisplay;

async function handleLoginState(displayState, setDisplayState, email, password, keepUserSigned){
    const state = {...displayState};

    // Validation trigger
    if (state.submitted || state.invalidEmail){
        state.invalidEmail = !validateEmail(email);
    }

    // Lock loginbutton
    if (state.submitted && !state.invalidEmail){
        state.loginButtonEnabled = false;
    }

    // Authentication
    if(!state.submitted &&!state.loginButtonEnabled){
        await authenticate(email, password, keepUserSigned);
    }

    state.submitted = false;

    if(!isEqual(state, displayState))
        setDisplayState(state);
}
  
function validateEmail(email){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){

        return true;
    } else {
        return false;
    }
}

async function authenticate(){

}

function openRegistration(){

}