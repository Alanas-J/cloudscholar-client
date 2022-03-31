import {Modal, Button} from 'react-bootstrap';
import styles from '../Modal.module.css'
import {useState} from 'react';
import { DateTime } from 'luxon';


function ViewTaskModal({show, data, handleClose}) {

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className=' d-flex content d-flex align-items-start'>
                <div className="row">
                    <div className="display-5 px-3">Task View</div>
                </div>
            </Modal.Header>
            <Modal.Body>

            <div className="mb-4">
                <div className="mx-2 h5 border-bottom">Belongs to</div>
                <div className="d-flex px-5"><div className="pe-2">{data.subject.name}</div><div className={styles.colourDiv+ ' border'} style={{backgroundColor: data.subject.colour}}></div></div>
            </div>

            <div className="my-3">
                <div className="mx-2 h5 border-bottom">Task Details</div>
                <div className="px-5 pb-1">Task Name: {data.name}</div>
                <div className="px-5 pb-1">Due Time: {DateTime.fromISO(data.due_datetime).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}</div>
                <div className="px-5 pb-1">Completed: {data.completed? 'Yes' : 'No'}</div>
                <div className="px-5 font-weight-bold pb-1">Description: </div>
                <div className='px-4 mx-5 rounded py-1' style={{whiteSpace: 'pre-wrap', backgroundColor: '#2222220F'}}>
                    {data.description? data.description : 'No description provided'}
                </div>
                
            </div>

            </Modal.Body>

            <Modal.Footer className='border-top-0 px-4 mx-54'>

                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={() => handleDelete()} >
                    Delete Task
                </Button>
            </Modal.Footer>
        </Modal>
    ); 
}
export default ViewTaskModal;

function handleDelete(){

}
  

function dayIntToString(int){

    switch(int){
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
        case 7:
            return 'Sunday';
        default:
            return 'n/a'

    }


}
