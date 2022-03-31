import {Modal, Button} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import registerUser from '../../../utility/requests/registerUser';


function RegisterUserModal({show, handleClose}) {

    // Form inputs
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [formState, setFormState] = useState({
        submissionAttempted: false,
        submitted: false
    });

    // Validation
    const validEmail = validateEmail(email);
    const validPassword = password !== "";
    const inputsAreValid =  validEmail && validPassword;

    useEffect(() => {
        if(formState.submitted){
            const registrationObject = {email, password};

            setFormState({
                submissionAttempted: false,
                submitted: false
            });

            handleRegistration(registrationObject, setFormState);
        
        }
    }, [formState.submitted, email, password]);


    return (
        <Modal show={show} onHide={!formState.submitted? handleClose : undefined} centered>
            <Modal.Header closeButton className=' d-flex content d-flex align-items-start'>
                <div className="row">
                    <div className="display-5 px-3">Welcome to CloudScholar</div>
                </div>
            </Modal.Header>
            <Modal.Body>
                <h5 className='mx-4 mb-4'>Enter your registration details</h5>
        
                <div className="px-5">
                    <form>
                        <div className="form-floating my-2">
                            <input disabled={formState.submitted} type="email" className={((!validEmail && formState.submissionAttempted) && 'is-invalid')+' form-control'} placeholder="name@example.com" onChange={e => setEmail(e.target.value)}/>
                            <label >Email address</label>
                            <div className="text-left invalid-feedback mb-2 ms-2">
                                Please enter valid email. Eg. 'person@mail.com'.
                            </div>                            
                        </div>

                        <div className="form-floating my-2">
                            <input disabled={formState.submitted} type="password" className={((!validPassword && formState.submissionAttempted) && 'is-invalid')+' form-control'} placeholder="name@example.com" onChange={e => setPassword(e.target.value)}/>
                            <label >Password</label>
                            <div className="text-left invalid-feedback mb-2 ms-2">
                                 Please enter a password.
                            </div>
                        </div>
                    </form>
                </div>
            </Modal.Body>

            <Modal.Footer className='border-top-0 px-4 mx-54'>
                <div className="col-12 px-3 text center"> 
                    {formState.errorMessage &&
                        <div className="alert alert-danger" role="alert">
                            Error: {formState.errorMessage}
                        </div>
                    }
                    {formState.success &&
                        <div className="alert alert-success" role="alert">
                            User Registered!
                        </div>}    
                </div>
                <Button variant="secondary" onClick={!formState.submitted? handleClose : undefined}>
                    Close
                </Button>
                <Button variant="primary" disabled={formState.submitted || formState.success} onClick={() => handleSubmit(setFormState, inputsAreValid)}>
                    Register
                </Button>
            </Modal.Footer>
        </Modal>
    ); 
}
export default RegisterUserModal;
  

function validateEmail(email){
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
}


function handleSubmit(setFormState, inputsAreValid){
    setFormState({
        submissionAttempted: true,
        submitted: inputsAreValid
    });
}


async function handleRegistration(registrationObject, setFormState){

    const formState = {
        submissionAttempted: false,
        submitted: false
    };

    try {
        await registerUser(registrationObject);

        formState.success = true;
        formState.errorMessage = false;
        formState.clearInputs = true;

    } catch (error) {

        if(error.message === 'Network Error'){
            formState.errorMessage = "Connection to the server failed, if problem persists, restart the application.";
        } else if (error.response.data.message){
            formState.errorMessage = error.response.data.message;
        } else{
            formState.errorMessage = 'An unknown error has occured.'
        }
        formState.success = false;
        console.log({error: error});

    }
    setFormState(formState);
}