import {Modal, Button} from 'react-bootstrap';

function AddClassModal({show, handleClose}) {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Classes</Modal.Title>
            </Modal.Header>
            <Modal.Body>This is where add classes logic will go</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    ); 
  }
  export default AddClassModal;
  