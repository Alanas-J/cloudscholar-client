import {Modal, Button} from 'react-bootstrap';
import styles from '../Modal.module.css'
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { DateTime } from 'luxon';
import deleteTask from '../../../utility/user_data/deleteTask';
import updateUserData from '../../../utility/requests/updateUserData';


function ViewTaskModal({show, data, handleClose}) {

    const dispatch = useDispatch();
    const userData = useSelector(state => state.userState.value.userData);
    const [modalState, setModalState] = useState({
        deleteClicked: false,
        deleting: false,
        deleted: false,
        error: null
    });

    useEffect(() => {
        if(modalState.deleting){
            handleDelete(data, userData, setModalState, dispatch);
        }
    }, [userData, dispatch, modalState.deleting, data])



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
                <div className="col-12 px-3 text center"> 
                    {modalState.error &&
                        <div className="alert alert-danger" role="alert">
                            Error: {modalState.error}
                        </div>
                    }
                </div>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button disabled={(modalState.deleted || modalState.deleting)} onClick={() => handleDeleteClick(modalState, setModalState)} variant="danger" >
                    {(!modalState.deleteClicked && !(modalState.deleting || modalState.deleted)) && 'Delete Task'} 
                    {modalState.deleteClicked && 'Warning! Click to confirm deletion'}
                    {modalState.deleting && 'Deleting task...'}
                    {modalState.deleted && 'Task deleted'}
                </Button>
            </Modal.Footer>
        </Modal>
    ); 
}
export default ViewTaskModal;


function handleDeleteClick(modalState, setModalState){

    if(!modalState.deleteClicked){
        setModalState({
            deleteClicked: true,
            deleting: false,
            deleted: false,
            error: null
        });

    } else if(modalState.deleteClicked){
        setModalState({
            deleteClicked: false,
            deleting: true,
            deleted: false,
            error: null
        });
    }
}


async function handleDelete(task, userData, setModalState, dispatch){

    const userDataPayload = deleteTask(task, userData);

    console.log(userDataPayload)
    const modalState = {
        deleteClicked: false,
        deleting: false,
        deleted: false,
        error: null
    }

    try {
        await updateUserData(userDataPayload, dispatch);
        modalState.deleted = true;

    } catch (error) {
        if(error.message === 'Network Error'){
            modalState.error = "Connection to the server failed, if problem persists, restart the application.";
        } else if (error.response){
            modalState.error = error.response.data.message;
        } else {
            modalState.error = 'An unknown error has occured.'
        }
        console.log({error: error});

    }
    setModalState(modalState);
    
}
