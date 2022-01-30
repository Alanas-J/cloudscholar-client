import './LoginDisplay.css'

function LoginDisplay({setLoggedIn}) {
    return (
      <div className='loginDisplay text-center'>
       
       <main className="form-signin">
          <form>
            <img className="mb-4" src={require('./logo192.png')} alt="" width="72" height="57"/>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
              <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me"/> Remember me
              </label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" onClick={() => setLoggedIn(true)}>Sign in</button>
            <a>Don't have an account? Register Here</a>
            <p className="mt-5 mb-3 text-muted">©CloudScholar 2021–2022</p>
          </form>
        </main>
        

      </div>

    ); 
  }
  export default LoginDisplay;
  