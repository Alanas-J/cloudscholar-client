import { useState } from 'react';
import styles from  './LoginDisplay.module.css'

function LoginDisplay({setLoggedIn}) {

    const [displayState, setDisplayState] = useState({
        loginButtonEnabled: true,
        error: true,
        errorMessage: "Auth failure error goes here.",
        submitted: false
    });
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [keepUserSigned, setKeepUserSigned] = useState(false);


    // State machine.
    if(displayState.submitted){

        if(validateEmail(email, displayState, setDisplayState)){

            if(authenticate(email, password, setDisplayState)){

                if(keepUserSigned){
                    
                    // Save login details
                }

                // Swap view
            }
        }
    }

    return (
        <div className={styles.loginDisplay+' '}>
            <main className={styles.formSignin+' d-flex flex-column justify-content-center'}>
                <form className='pb-5'>

                    <div className="logo text-center">
                        <img className="mb-4 text-center" src={require('./logo192.png')} alt="" width="72" height="57"/>
                    </div>
                    
                    <h1 className="h3 mb-3 fw-normal text-center">CloudScholar</h1>

                    <div className="auth-error-div">
                        <div class="alert alert-danger mb-1" role="alert">
                            {displayState.errorMessage}
                        </div>
                    </div>

                    <div className="login-inputs">
                        <div className="form-floating my-1">
                            <input type="email" className="form-control is-invalid" id="floatingInput" placeholder="name@example.com" onChange={e => setEmail(e.target.value)}/>
                            <label htmlFor="floatingInput">Email address</label>
                            <div id="validationServerUsernameFeedback" className="text-left invalid-feedback mb-2 ms-2">
                                Please enter valid email. Eg. 'person@mail.com'.
                            </div>
                            
                        </div>

                        
                        <div className="form-floating my-1">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="checkbox mb-3 text-center">
                        <label >
                            <input type="checkbox" onChange={e => setKeepUserSigned(e.target.checked)}/> Keep me signed in
                        </label>
                        </div>
                        <button disabled={!displayState.loginButtonEnabled} className="w-100 btn btn-lg btn-primary" 
                            onClick={(e) => {setDisplayState({...displayState, submitted: true}); e.preventDefault();}}>
                            {displayState.loginButtonEnabled? "Sign in" : "Signing in..."}
                        </button>
                        <div className='text-center'>
                            <a>Don't have an account? Register Here</a>
                        </div>
                        
                    </div>
                    
                </form>
            </main>
        </div>); 
}
export default LoginDisplay;
  
function validateEmail(email, displayState, setDisplayState){
    return false;
}

function authenticate(){

}