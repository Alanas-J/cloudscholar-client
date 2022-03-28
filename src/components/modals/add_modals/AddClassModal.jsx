import {Modal, Button} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import styles from '../Modal.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {openModal} from '../../../state/slices/modalState';
import {DateTime} from 'luxon';
import addClassToSubject from '../../../utility/user_data/addClassToSubject';
import updateUserData from '../../../utility/requests/updateUserData';


function AddClassModal({show, handleClose}) {

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
            <Modal.Header closeButton>
                <Modal.Title>Add a Class</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group pt-2">
                        <label>What Subject is this class for?</label>
                        <select defaultValue="-Select Subject-" className={((!subjectSelected && formState.submissionAttempted) && "is-invalid") + " form-control form-select"}  onChange={e => {setSubject(e.target.value); setFormState({...formState, success: false})}}>
                            <option disabled>-Select Subject-</option>
                            {userData.subjects && userData.subjects.map((subject, index) => {
                                return (<option key={index}>{subject.name}</option>)})}
                        </select>
                        <div className="text-left invalid-feedback  ms-2">
                            Please select a subject.
                        </div>
                        <div className="row px-3">
                            <p className={styles.pointable +" link-primary"} onClick={() => dispatch(openModal('AddSubject'))}>
                                Add new subjects here +
                            </p>
                        </div>
                    </div>

                    <div className="form-group pt-2">
                        <label>When is the class?</label>
                        <select defaultValue="-Select Day-" className={((!daySelected && formState.submissionAttempted) && "is-invalid") + " form-control form-select"}  onChange={e => {setDay(e.target.value); setFormState({...formState, success: false})}}>
                        <option disabled >-Select Day-</option>
                            <option>Monday</option>
                            <option>Tuesday</option>
                            <option>Wednesday</option>
                            <option>Thursday</option>
                            <option>Friday</option>
                            <option>Saturday</option>
                            <option>Sunday</option>
                        </select>
                        <div className="text-left invalid-feedback  ms-2">
                            Please select a day.
                        </div>

                        <div className="row pt-2">
                            <div className="col">
                                <input type="text" className={((!validStartTime && formState.submissionAttempted) && "is-invalid") + " form-control"} placeholder="Start Time. eg. 12:00" onChange={e => {setStartTime(e.target.value); setFormState({...formState, success: false})}}/>
                                <div className="text-left invalid-feedback  ms-2">
                                    Expecting 'hh:mm'. Must be less than the end time.
                                </div>
                            </div>
                            
                            <div className="col">
                                <input type="text" className={((!validEndTime && formState.submissionAttempted) && "is-invalid") + " form-control"} placeholder="End Time eg. 13:00" onChange={e => {setEndTime(e.target.value); setFormState({...formState, success: false})}}/>
                                <div className="text-left invalid-feedback  ms-2">
                                    Expecting 'hh:mm'. Must be greater than the start time.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-group pt-2 mt-2">
                        <label>Class Type</label>
                        <select defaultValue="-Select a type- (Optional)" className="form-control form-select" onChange={e => {setType(e.target.value); setFormState({...formState, success: false})}}>
                            <option disabled>-Select a type- (Optional)</option>
                            <option>Class</option>
                            <option>Lab</option>
                            <option>Lecture</option>
                            <option>Practical</option>
                            <option>Tutorial</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div className="form-group pt-2 mt-2">
                        <label>Location</label>
                        <input type="text" className="form-control" placeholder="Location eg. C-201 (Optional)"  onChange={e => {setLocation(e.target.value); setFormState({...formState, success: false})}}/>
                    </div>

                    <div className="form-group py-2">
                            <div className="form-group pt-4 pb-2">
                            <label>Description</label>
                            <textarea className="form-control" rows="3" placeholder="Any additional information... (Optional)"  onChange={e => {setDescription(e.target.value); setFormState({...formState, success: false})}}></textarea>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <div className="col-12 px-3 text center"> 
                    {formState.errorMessage &&
                        <div className="alert alert-danger" role="alert">
                            Error: {formState.errorMessage}
                        </div>
                    }
                    {formState.success &&
                        <div className="alert alert-success" role="alert">
                            Class added!
                        </div>}    
                </div>
                <Button variant="secondary" onClick={!formState.submitted? handleClose : undefined}>
                Close
                </Button>
                <Button variant="primary" disabled={formState.submitted || formState.success} onClick={() => handleSubmit(setFormState, inputsAreValid)}>
                Add Class
                </Button>
            </Modal.Footer>
        </Modal>
    ); 
}
export default AddClassModal;
  

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