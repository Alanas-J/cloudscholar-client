import {Modal, Button} from 'react-bootstrap';
import styles from '../Modal.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {openModal} from '../../../state/slices/modalState'

function AddClassModal({show, handleClose}) {
    const dispatch = useDispatch();

    const {userState, modalState} = useSelector(state => { 
            return {userState: state.userState.value, modalState: state.modalState.value}
        });

    console.log(modalState);
    console.log(userState);

    const userData = userState.userData;


    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add a Class</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                <form>
                    <div className="form-group pt-2">
                        <label htmlFor="exampleFormControlSelect1">What Subject is this class for?</label>
                        <select defaultValue="-Select Subject-" className="form-control form-select" id="exampleFormControlSelect1">
                            <option disabled>-Select Subject-</option>
                            {userData.subjects && userData.subjects.map(subject => {
                                return (<option>{subject.name}</option>)})}
                            
                        </select>
                        <div className="row px-3">
                            <p className={styles.pointable +" link-primary"} onClick={() => dispatch(openModal('AddSubject'))}>
                                Add new subjects here +
                            </p>
                        </div>
                    </div>

                    <div className="form-group pt-2">
                        <label htmlFor="exampleFormControlSelect1">When is the class?</label>
                        <select className="form-control form-select" id="exampleFormControlSelect1">
                        <option disabled selected>-Select Day-</option>
                            <option>Monday</option>
                            <option>Tuesday</option>
                            <option>Wednesday</option>
                            <option>Thursday</option>
                            <option>Friday</option>
                            <option>Saturday</option>
                            <option>Sunday</option>
                        </select>

                        <div className="row pt-2">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Start Time. eg. 12:00"/>
                            </div>

                            <div className="col">
                            <input type="text" className="form-control" placeholder="End Time eg. 13:00"/>
                            </div>
                        </div>
                    </div>

                    <div className="form-group pt-2 mt-2">
                        <label htmlFor="exampleFormControlSelect1">Class Type</label>
                        <select className="form-control form-select" id="exampleFormControlSelect1">
                        <option disabled selected>-Select a type-</option>
                            <option>Class</option>
                            <option>Lab</option>
                            <option>Lecture</option>
                            <option>Practical</option>
                            <option>Tutorial</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div className="form-group pt-2 mt-2">
                        <label htmlFor="exampleFormControlSelect1">Location</label>
                        <input type="text" className="form-control" placeholder="Location eg. C-201 (Optional)"/>
                    </div>


                    <div className="form-group py-2">

                        
                            <div className="form-group pt-4 pb-2">
                            <label htmlFor="exampleFormControlTextarea1">Description</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Any additional information... (Optional)"></textarea>
                        </div>
                    </div>
    
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                Add Class
                </Button>
            </Modal.Footer>
        </Modal>
    ); 
  }
  export default AddClassModal;
  