import {Modal, Button} from 'react-bootstrap';

function AddQuickShortcutModal({show, handleClose}) {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Quick Shortcut URLs (TBD)</Modal.Title>
            </Modal.Header>
            <Modal.Body>


                <div className="row border-bottom my-2 py-2">
                <form>
                    <div className="form-group">
                        <h5>Adding a new Shortcut</h5>
                    </div>
                    <div className="form-group py-2">
                        <label htmlFor="exampleFormControlInput1">Shortcut name</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="eg. Brightspace"/>
                    </div>
                    <div className="form-group py-2">
                        <label htmlFor="exampleFormControlInput1">Shortcut URL</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="eg. https://www.brightspace.com"/>
                    </div>

    
                </form>
                </div>



                <div className="row border-bottom my-3">
                <h5>Edit Shortcuts</h5>
                (TBD)
                </div>
                <pre>
                </pre>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
            </Modal.Footer>
        </Modal>
    ); 
  }
  export default AddQuickShortcutModal;
  