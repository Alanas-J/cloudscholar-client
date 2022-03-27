import {Modal, Button} from 'react-bootstrap';
import {useState} from 'react';
import styles from '../Modal.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {openModal} from '../../../state/slices/modalState';
import {DateTime} from 'luxon';

function AddClassModal({show, handleClose}) {
    const dispatch = useDispatch();

    const {userState, modalState} = useSelector(state => { 
            return {userState: state.userState.value, modalState: state.modalState.value}
        });

    console.log(modalState);
    console.log(userState);

    const userData = userState.userData;

    // Form inputs
    const [subject, setSubject] = useState(null);
    const [day, setDay] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [type, setType] = useState(null);
    const [location, setLocation] = useState(null);
    const [description, setDescription] = useState(null);

    const classObject = {day, startTime, endTime, type, location, description}

    const [formState, setFormState] = useState({
        submissionAttempted: true,
        submitted: false,
    });

    

    const subjectSelected = !!subject;
    const daySelected = !!day
    const {validStartTime, validEndTime} = validateTimes(startTime, endTime);

    console.log(!subjectSelected);

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add a Class</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                <form>
                    <div className="form-group pt-2">
                        <label>What Subject is this class for?</label>
                        <select defaultValue="-Select Subject-" className={((!subjectSelected && formState.submissionAttempted) && "is-invalid") + " form-control form-select"}  onChange={e => setSubject(e.target.value)}>
                            <option disabled>-Select Subject-</option>
                            {userData.subjects && userData.subjects.map(subject => {
                                return (<option>{subject.name}</option>)})}
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
                        <select className={((!daySelected && formState.submissionAttempted) && "is-invalid") + " form-control form-select"}  onChange={e => setDay(e.target.value)}>
                        <option disabled selected>-Select Day-</option>
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
                                <input type="text" className={((!validStartTime && formState.submissionAttempted) && "is-invalid") + " form-control"} placeholder="Start Time. eg. 12:00" onChange={e => setStartTime(e.target.value)}/>
                                <div className="text-left invalid-feedback  ms-2">
                                    Expecting 'HH:MM'. eg '13:00'.
                                </div>
                            </div>
                            
                            <div className="col">
                                <input type="text" className={((!validEndTime && formState.submissionAttempted) && "is-invalid") + " form-control"} placeholder="End Time eg. 13:00" onChange={e => setEndTime(e.target.value)}/>
                                <div className="text-left invalid-feedback  ms-2">
                                    Expecting 'HH:MM'. eg '13:00'.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-group pt-2 mt-2">
                        <label>Class Type</label>
                        <select className="form-control form-select" onChange={e => setType(e.target.value)}>
                        <option disabled selected>-Select a type- (Optional)</option>
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
                        <input type="text" className="form-control" placeholder="Location eg. C-201 (Optional)"  onChange={e => setLocation(e.target.value)}/>
                    </div>

                    <div className="form-group py-2">
                            <div className="form-group pt-4 pb-2">
                            <label>Description</label>
                            <textarea className="form-control" rows="3" placeholder="Any additional information... (Optional)"  onChange={e => setDescription(e.target.value)}></textarea>
                        </div>
                    </div>
    
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button variant="primary" onClick={() => handleSubmit(setFormState)}>
                Add Class
                </Button>
            </Modal.Footer>
        </Modal>
    ); 
  }
  export default AddClassModal;
  

function validateTimes(startTime, endTime){

    const validStartTime = /^([0-1]?\d|2[0-3])(?::([0-5]\d))$/.test(startTime);
    const validEndTime = /^([0-1]?\d|2[0-3])(?::([0-5]\d))$/.test(endTime);

    if(startTime && endTime){
        console.log(DateTime.fromISO(startTime));
    }

    return {
        validStartTime: validStartTime,
        validEndTime: validEndTime
    }
}

function handleSubmit(setFormState){
    // set the formstate

    setFormState({
        submissionAttempted: true,
        submitted: true,
    });

}