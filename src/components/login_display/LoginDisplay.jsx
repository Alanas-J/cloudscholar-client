import { useState } from 'react';
import './LoginDisplay.css'

function LoginDisplay({setLoggedIn}) {

    const [displayState, setDisplayState] = useState({
        loginButtonEnabled: true,
        loginButtonText: "Sign in",
        error: false,
        errorMessage: "",
        submitted: false
    });

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [keepUserSigned, setKeepUserSigned] = useState(false);

    if(displayState.submitted){
        if(validateEmail(email, displayState, setDisplayState)){
            authenticate(email, password, setDisplayState)
        }
    }

    return (
      <div className='loginDisplay text-center'>
       
       <main className="form-signin d-flex flex-column justify-content-center">
          <form className='pb-5'>
          <img className="mb-4" src={require('./logo192.png')} alt="" width="72" height="57"/>
            <h1 className="h3 mb-3 fw-normal">CloudScholar</h1>

            <div className="form-floating my-1">
              <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setEmail(e.target.value)}/>
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating my-1">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="checkbox mb-3">
              <label>
                <input type="checkbox" onChange={e => setKeepUserSigned(e.target.checked)}/> Keep me signed in
              </label>
            </div>
            <button {displayState.loginButtonEnabled? `disabled="true"` : ``} className="w-100 btn btn-lg btn-primary" onClick={() => setLoggedIn(true)}>Sign in</button>
            <a>Don't have an account? Register Here</a>
          </form>
        </main>
        

      </div>

    ); 
}
export default LoginDisplay;
  
function validateEmail(email, displayState, setDisplayState){
    return false;
}

function authenticate(){

}