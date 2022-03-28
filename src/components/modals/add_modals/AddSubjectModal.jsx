import {Modal, Button} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {DateTime} from 'luxon';
import addSubject from '../../../utility/user_data/addSubject';
import updateUserData from '../../../utility/requests/updateUserData';
import convertIEDateToISO from '../../../utility/misc/convertIEDateToISO';


function AddClassModal({show, handleClose}) {

    // State
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userState.value.userData);


    // Form inputs
    const [name, setName] = useState(null);
    const [colour, setColour] = useState('#0063a5');
    const [start_date, setStartDate] = useState(null);
    const [end_date, setEndDate] = useState(null);

    const [formState, setFormState] = useState({
        submissionAttempted: false,
        submitted: false
    });

    // Validation
    const subjectHasValidName = !!name;
    const colourSelected = !!colour;
    const {validStartTime, validEndTime} = validateDates(start_date, end_date);
    const inputsAreValid =  subjectHasValidName && colourSelected && validStartTime && validEndTime;

    useEffect(() => {
        if(formState.submitted){
            const subjectObject = {name, colour, start_date, end_date};

            setFormState({
                submissionAttempted: false,
                submitted: false
            });

            handleSubjectAdd(subjectObject, setFormState, userData, dispatch);
        
        }
    }, [formState.submitted, name, colour, start_date, end_date, userData, dispatch]);


    return (
        <Modal show={show} onHide={!formState.submitted? handleClose : undefined} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add a Subject</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>

                    <div className="form-group py-2">
                        <label>Name of Subject</label>
                        <input type="text" className={((!subjectHasValidName && formState.submissionAttempted) && "is-invalid") + " form-control"} placeholder="eg. 1st Year Maths" onChange={e => {setName(e.target.value); setFormState({...formState, success: false})}}/>
                        <div className="text-left invalid-feedback ms-2">
                            Please enter a valid subject name.
                        </div>
                    </div>


                    <div className="form-group py-2">
                        <label>Pick a Colour for this Subject</label>
                        <input type="color" defaultValue="#0063a5" className={((!colourSelected  && formState.submissionAttempted) && "is-invalid") + " form-control"} onChange={e => {setColour(e.target.value); setFormState({...formState, success: false})}}/>
                        <div className="text-left invalid-feedback ms-2">
                            Please select a colour.
                        </div>
                    </div>

                    <div className="form-group pt-2">
                        <label>What is the duration of this subject?</label>
                        <div className="row pt-2">
                            <div className="col">
                                <input type="text" className={((!validStartTime && formState.submissionAttempted) && "is-invalid") + " form-control"} placeholder="Start Date. eg. 13/01/2022" onChange={e => {setStartDate(e.target.value); setFormState({...formState, success: false})}}/>
                                <div className="text-left invalid-feedback  ms-2">
                                    Expecting 'dd/mm/yyyy'. Must be less than the end date.
                                </div>
                            </div>
                            
                            <div className="col">
                                <input type="text" className={((!validEndTime && formState.submissionAttempted) && "is-invalid") + " form-control"} placeholder="End Date eg. 13/05/2022" onChange={e => {setEndDate(e.target.value); setFormState({...formState, success: false})}}/>
                                <div className="text-left invalid-feedback  ms-2">
                                    Expecting 'dd/mm/yyyy'. Must be greater than the start date.
                                </div>
                            </div>
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
                            Subject added!
                        </div>}    
                </div>
                <Button variant="secondary" onClick={!formState.submitted? handleClose : undefined}>
                Close
                </Button>
                <Button variant="primary" disabled={formState.submitted || formState.success} onClick={() => handleSubmit(setFormState, inputsAreValid)}>
                Add Subject
                </Button>
            </Modal.Footer>
        </Modal>
    ); 
}
export default AddClassModal;
  

function validateDates(start_time, end_time){

    let startDateTime;
    let endDateTime;
    let validStartTime = /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(start_time);
    let validEndTime = /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(end_time);


    if(validStartTime){
        startDateTime = DateTime.fromISO(convertIEDateToISO(start_time));

        if(!startDateTime.isValid)
            validStartTime = false;
    }
    if(validEndTime){
        endDateTime = DateTime.fromISO(convertIEDateToISO(end_time));

        if(!endDateTime.isValid)
            validEndTime = false;
    }


    if(validStartTime && validEndTime){
        const diff = endDateTime.toMillis() - startDateTime.toMillis();

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


async function handleSubjectAdd(subjectObject, setFormState, userData, dispatch){

    
    const newUserData = addSubject(subjectObject, userData);
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