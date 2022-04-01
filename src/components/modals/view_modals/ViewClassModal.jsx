import {Modal, Button} from 'react-bootstrap';
import styles from '../Modal.module.css'
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import deleteClass from '../../../utility/user_data/deleteClass';
import updateUserData from '../../../utility/requests/updateUserData';


function ViewClassModal({show, data, handleClose}) {

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
                    <div className="display-5 px-3">Class View</div>
                </div>
            </Modal.Header>

            <Modal.Body>
                <div className="mb-4">
                    <div className="mx-2 h5 border-bottom">Belongs to</div>
                    <div className="d-flex px-5"><div className="pe-2">{data.subject.name}</div><div className={styles.colourDiv+ ' border'} style={{backgroundColor: data.subject.colour}}></div></div>
                </div>

                <div className="my-3">
                    <div className="mx-2 h5 border-bottom">Class Details</div>
                    <div className="px-5 pb-1">Class Type: {data.type}</div>
                    <div className="px-5 pb-1">Day: {dayIntToString(data.day)}</div>
                    <div className="px-5 pb-1">Duration: {data.start_time} - {data.end_time}</div>
                    <div className="px-5 font-weight-bold pb-1">Description: </div>
                    <div className='px-4 mx-5 rounded py-1' style={{whiteSpace: 'pre-wrap', backgroundColor: '#2222220F'}}>
                        {data.description? data.description : 'No description provided'}
                    </div> 
                </div>
            </Modal.Body>

            <Modal.Footer className='border-top-0 px-4 mx-4'>
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
                    {(!modalState.deleteClicked && !(modalState.deleting || modalState.deleted)) && 'Delete Class'} 
                    {modalState.deleteClicked && 'Warning! Click to confirm deletion'}
                    {modalState.deleting && 'Deleting class...'}
                    {modalState.deleted && 'Class deleted'}
                </Button>
            </Modal.Footer>
        </Modal>
    ); 
}
export default ViewClassModal;
  

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


async function handleDelete(_class, userData, setModalState, dispatch){

    const userDataPayload = deleteClass(_class, userData);
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
            modalState.errorMessage = "Connection to the server failed, if problem persists, restart the application.";
        } else if (error.response.data.message){
            modalState.errorMessage = error.response.data.message;
        } else {
            modalState.errorMessage = 'An unknown error has occured.'
        }
        console.log({error: error});

    }
    setModalState(modalState);
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
