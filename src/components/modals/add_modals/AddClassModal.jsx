import {Modal, Button} from 'react-bootstrap';
import styles from '../Modal.module.css';

// Redux state
import {useDispatch} from 'react-redux';
import {openModal} from '../../../state/slices/modalState'

function AddClassModal({show, handleClose}) {
    const dispatch = useDispatch();

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add a Class</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                <form>
                    <div className="form-group py-2">
                        <label htmlFor="exampleFormControlSelect1">What Subject is this class for?</label>
                        <select className="form-control" id="exampleFormControlSelect1">
                        <option></option>
                        <option>Sample module 1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        </select>
                        <div className="row px-3">
                            <a className={styles.pointable +" link-primary"} onClick={() => dispatch(openModal('AddSubject'))}>
                                Add new subjects here +
                            </a>
                        </div>
                    </div>

                    <div className="form-group pt-2">
                        <label htmlFor="exampleFormControlSelect1">When is the class?</label>
                        <select className="form-control" id="exampleFormControlSelect1">
                        <option>Monday</option>
                        <option>Tuesday</option>
                        <option>Wednesday</option>
                        <option>Thursday</option>
                        <option>Friday</option>
                        </select>
                    </div>

                    <div className="form-group py-2">

                        <div className="row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Start Time"/>
                            </div>

                            <div className="col">
                            <input type="text" className="form-control" placeholder="End Time"/>
                            </div>
                        </div>
                            <div className="form-group pt-4 pb-2">
                            <label htmlFor="exampleFormControlTextarea1">Description</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Add class location, class type into here..."></textarea>
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
  