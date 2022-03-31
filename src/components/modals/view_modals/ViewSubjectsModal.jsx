import {Modal, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import styles from '../Modal.module.css'
import {useState} from 'react';


function ViewSubjectsModal({show, handleClose}) {

    const userData = useSelector(state => state.userState.value.userData);
    const [searchString, setSearchString] = useState("");
    const dispatch = useDispatch()


    let subjects;
    if(userData.subjects){
        subjects = userData.subjects.filter(subject => subject.name.includes(searchString))

    } else {
        subjects = null;
    }
    
    
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className=' d-flex content d-flex align-items-start'>
                <div className="row">
                    <div className="display-5 px-3">Subject Management</div>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className='mx-3 my-3  rounded-top form-floating'>
                
                    <input className="form-control" type="search" placeholder="Filter Subjects" onChange={e => setSearchString(e.target.value)}/>
                    <label >Subject search..</label>
                </div>
                <div className={styles.subjectContainer+' mx-3 mb-2 border rounded-bottom '}>
                    {subjects? subjects.map((subject) => {return <Subject key={uuidv4()} subject={subject}/>})  : <div className='h6 text-center py-4'>No subjects found.</div>}
                </div>
                
            </Modal.Body>

            <Modal.Footer className='border-top-0 px-4 mx-54'>

                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>

            </Modal.Footer>
        </Modal>
    ); 
}
export default ViewSubjectsModal;


function Subject({subject}){

    return (
        <div className='p-2 border'>
            <div className="d-flex">
                <div className="pe-2 h5">{subject.name}</div><div className={styles.colourDiv+ ' border'} style={{backgroundColor: subject.colour}}></div>
            </div>

            <div className="d-flex mb-2 border-bottom">

                <div className='ms-3' >
                    Duration: {subject.start_date} to {subject.end_date}
                </div>
                
            </div>
            <div className="d-flex justify-content-end">
                <button type="button" class="btn btn-danger">Remove</button>
            </div>
            
        </div>
    );
}