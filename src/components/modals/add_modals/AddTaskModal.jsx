import {Modal, Button} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import styles from '../Modal.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {openModal} from '../../../state/slices/modalState';
import {DateTime} from 'luxon';
import addTaskToSubject from '../../../utility/user_data/addTaskToSubject';
import updateUserData from '../../../utility/requests/updateUserData';
import convertIEDateToISO from '../../../utility/misc/convertIEDateToISO';


function AddTaskModal({show, handleClose}) {

    // State
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userState.value.userData);


    // Form inputs
    const [subject, setSubject] = useState(null);
    const [name, setName] = useState(null);
    const [due_time, setDue_time] = useState(null);
    const [due_date, setDue_date] = useState(null);
    const [description, setDescription] = useState(null);

    const [formState, setFormState] = useState({
        submissionAttempted: false,
        submitted: false
    });

    // Validation
    const subjectSelected = !!subject;
    const validName = !!name
    const validTime = validateTime(due_time);
    const validDate = validateDate(due_date);
    const inputsAreValid =  subjectSelected && validTime && validDate && validName;

    useEffect(() => {
        if(formState.submitted){
            const taskObject = {name, due_time, due_date, description};

            setFormState({
                submissionAttempted: false,
                submitted: false
            });

            handleTaskAdd(subject, taskObject, setFormState, userData, dispatch);
        
        }
    }, [formState.submitted, subject, name, due_time, due_date, description, userData, dispatch]);


    return (
        <Modal show={show} onHide={!formState.submitted? handleClose : undefined} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add a Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group pt-2">
                        <label>What subject is this task for?</label>
                        <select defaultValue="-Select Subject-" className={((!subjectSelected && formState.submissionAttempted) && "is-invalid") + " form-control form-select"}  onChange={e => {setSubject(e.target.value); setFormState({...formState, success: false})}}>
                            <option disabled>-Select Subject-</option>
                            {userData.subjects && userData.subjects.map((subject, index) => {
                                return (<option key={index}>{subject.name}</option>)})}
                        </select>
                        <div className="text-left invalid-feedback  ms-2">
                            Please select a subject.
                        </div>
                        <div className="row px-3">
                            <p className={styles.pointable +" link-primary"} onClick={() => dispatch(openModal({name: 'AddSubject'}))}>
                                Add new subjects here +
                            </p>
                        </div>
                    </div>

                    <div className="form-group pb-2">
                        <label>Task name</label>
                        <input type="text" className={((!validName && formState.submissionAttempted) && "is-invalid") + " form-control"} placeholder="eg. 1st Year Maths" onChange={e => {setName(e.target.value); setFormState({...formState, success: false})}}/>
                        <div className="text-left invalid-feedback ms-2">
                            Please enter a valid subject name.
                        </div>
                    </div>

                    <div className="form-group pt-2">
                        <label>When is the task due?</label>
                        <div className="row pt-2">
                            <div className="col">
                                <input type="text" className={((!validTime && formState.submissionAttempted) && "is-invalid") + " form-control"} placeholder="Time eg. 17:00" onChange={e => {setDue_time(e.target.value); setFormState({...formState, success: false})}}/>
                                <div className="text-left invalid-feedback  ms-2">
                                    Expecting 'hh:mm'.
                                </div>
                            </div>
                            
                            <div className="col">
                                <input type="text" className={((!validDate && formState.submissionAttempted) && "is-invalid") + " form-control"} placeholder="Date eg. 01/12/2022" onChange={e => {setDue_date(e.target.value); setFormState({...formState, success: false})}}/>
                                <div className="text-left invalid-feedback  ms-2">
                                    Expecting 'dd/mm/yyyy'.
                                </div>
                            </div>
                        </div>
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
                            Task added!
                        </div>}    
                </div>
                <Button variant="secondary" onClick={!formState.submitted? handleClose : undefined}>
                    Close
                </Button>
                <Button variant="primary" disabled={formState.submitted || formState.success} onClick={() => handleSubmit(setFormState, inputsAreValid)}>
                    Add Task
                </Button>
            </Modal.Footer>
        </Modal>
    ); 
}
export default AddTaskModal;
  

function validateTime(time){
    if(/^([0-1]?\d|2[0-3])(?::([0-5]\d))$/.test(time))
        return DateTime.fromISO(time).isValid;

    return false;
}

function validateDate(date){
    let dateIsValid = /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date);


    if(dateIsValid){
        dateIsValid = DateTime.fromISO(convertIEDateToISO(date)).isValid;
    }

    return dateIsValid;
}


function handleSubmit(setFormState, inputsAreValid){
    setFormState({
        submissionAttempted: true,
        submitted: inputsAreValid
    });
}


async function handleTaskAdd(subjectName, taskObject, setFormState, userData, dispatch){

    const newUserData = addTaskToSubject(subjectName, taskObject, userData);
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
        } else if (error.response){
            formState.errorMessage = error.response.data.message;
        } else{
            formState.errorMessage = 'An unknown error has occured.'
        }
        formState.success = false;
        console.log({error: error});

    }
    setFormState(formState);
    
}