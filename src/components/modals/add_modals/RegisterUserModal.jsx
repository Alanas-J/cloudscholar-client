import {Modal, Button} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import styles from '../Modal.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {openModal} from '../../../state/slices/modalState';
import {DateTime} from 'luxon';
import addClassToSubject from '../../../utility/user_data/addClassToSubject';
import updateUserData from '../../../utility/requests/updateUserData';


function RegisterUserModal({show, handleClose}) {

    // State
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userState.value.userData);


    // Form inputs
    const [subject, setSubject] = useState(null);
    const [day, setDay] = useState(null);
    const [start_time, setStartTime] = useState(null);
    const [end_time, setEndTime] = useState(null);
    const [type, setType] = useState(null);
    const [location, setLocation] = useState(null);
    const [description, setDescription] = useState(null);

    const [formState, setFormState] = useState({
        submissionAttempted: false,
        submitted: false
    });

    // Validation
    const subjectSelected = !!subject;
    const daySelected = !!day
    const {validStartTime, validEndTime} = validateTimes(start_time, end_time);
    const inputsAreValid =  subjectSelected && daySelected && validStartTime && validEndTime;

    useEffect(() => {
        if(formState.submitted){
            const classObject = {day, start_time, end_time, type, location, description};

            setFormState({
                submissionAttempted: false,
                submitted: false
            });

            handleClassAdd(subject, classObject, setFormState, userData, dispatch);
        
        }
    }, [formState.submitted, subject, day, start_time, end_time, type, location, description, userData, dispatch]);


    return (
        <Modal show={show} onHide={!formState.submitted? handleClose : undefined} centered>
            <Modal.Header closeButton className=' d-flex content d-flex align-items-start'>
               
            <div className="row">
                <div className="display-5">Welcome to CloudScholar</div>
            </div>

                
            </Modal.Header>
               
            <Modal.Body>

                <h5 className='mx-3 mb-4'>Enter your registration details</h5>
                
                <div className="px-5">
                    <form>

                        <div className="form-floating my-2">
                            <input disabled={daySelected } type="email" className={(daySelected  && 'is-invalid')+' form-control'} id="floatingInput" placeholder="name@example.com" onChange={e => setDay(e.target.value)}/>
                            <label htmlFor="floatingInput">Email address</label>
                            
                            {daySelected  &&
                                <div id="validationServerUsernameFeedback" className="text-left invalid-feedback mb-2 ms-2">
                                    Please enter valid email. Eg. 'person@mail.com'.
                                </div>
                            }  
                        </div>

                        <div className="form-floating my-2">
                            <input disabled={daySelected } type="email" className={(daySelected  && 'is-invalid')+' form-control'} id="floatingInput" placeholder="name@example.com" onChange={e => setDay(e.target.value)}/>
                            <label htmlFor="floatingInput">Password</label>
                            
                            {daySelected  &&
                                <div id="validationServerUsernameFeedback" className="text-left invalid-feedback mb-2 ms-2">
                                    Please enter valid email. Eg. 'person@mail.com'.
                                </div>
                            }  
                        </div>

                    </form>
                </div>

                
            </Modal.Body>
            <Modal.Footer className='border-top-0'>
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
  

function validateTimes(start_time, end_time){

    let validStartTime = /^([0-1]?\d|2[0-3])(?::([0-5]\d))$/.test(start_time);
    let validEndTime = /^([0-1]?\d|2[0-3])(?::([0-5]\d))$/.test(end_time);

    if(validStartTime && validEndTime){
        const diff = DateTime.fromISO(end_time).toMillis() - DateTime.fromISO(start_time).toMillis();

        if(diff < 1){
            validStartTime = false;
            validEndTime = false;
        }
    }

    return {
        validStartTime: validStartTime,
        validEndTime: validEndTime
    }
}


function handleSubmit(setFormState, inputsAreValid){
    setFormState({
        submissionAttempted: true,
        submitted: inputsAreValid
    });
}


async function handleClassAdd(subjectName, classObject, setFormState, userData, dispatch){

    const newUserData = addClassToSubject(subjectName, classObject, userData);
    const formState = {
        submissionAttempted: false,
        submitted: false
    };

    try {
        await updateUserData(newUserData, dispatch);

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