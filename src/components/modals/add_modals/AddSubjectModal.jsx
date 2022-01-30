import {Modal, Button} from 'react-bootstrap';

function AddSubjectModal({show, handleClose}) {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add a Subject</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                <form>
                    <div class="form-group py-2">
                        <label for="exampleFormControlInput1">Name of Subject</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="eg. 1st Year Maths"/>
                    </div>

                    <div class="form-group py-2">
                        <label for="exampleFormControlInput1">Pick a Colour for this Subject</label>
                        <input type="color" value="#0063a5" class="form-control" id="exampleFormControlInput1"/>
                    </div>


                    <div className="form-group py-2">
                        <label htmlFor="exampleFormControlSelect1">What is the duration of this Subject?</label>
                        <div className="row">
                            <div className="col">
                                <input type="text" class="form-control" placeholder="Start Date"/>
                            </div>

                            <div className="col">
                            <input type="text" class="form-control" placeholder="End Date"/>
                            </div>
                        </div>
                    </div>
    
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Add Subject
                </Button>
            </Modal.Footer>
        </Modal>
    ); 
  }
  export default AddSubjectModal;
  