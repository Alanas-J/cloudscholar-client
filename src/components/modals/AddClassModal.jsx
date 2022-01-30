import {Modal, Button} from 'react-bootstrap';

function AddClassModal({show, handleClose}) {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Classes</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                <form>
                    <div class="form-group py-2">
                        <label htmlFor="exampleFormControlSelect1">What Subject is this class for?</label>
                        <select class="form-control" id="exampleFormControlSelect1">
                        <option></option>
                        <option>Sample module 1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        </select>
                        <div className="row px-3">
                            <a href="" className='link-primary'>Add new subjects here +</a>
                        </div>
                    </div>

                    <div class="form-group pt-2">
                        <label htmlFor="exampleFormControlSelect1">When is the class?</label>
                        <select class="form-control" id="exampleFormControlSelect1">
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
                                <input type="text" class="form-control" placeholder="Start Time"/>
                            </div>

                            <div className="col">
                            <input type="text" class="form-control" placeholder="End Time"/>
                            </div>
                        </div>
                            <div class="form-group pt-4 pb-2">
                            <label for="exampleFormControlTextarea1">Description</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Add class location, class type into here..."></textarea>
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
  