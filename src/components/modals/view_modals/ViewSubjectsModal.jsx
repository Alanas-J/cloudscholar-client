import {Modal, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import styles from '../Modal.module.css'
import {useState, useEffect} from 'react';
import deleteSubject from '../../../utility/user_data/deleteSubject';
import updateUserData from '../../../utility/requests/updateUserData';


function ViewSubjectsModal({show, handleClose}) {

    const userData = useSelector(state => state.userState.value.userData);
    const [searchString, setSearchString] = useState("");


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
                <div className={styles.subjectContainer+' mx-3 border rounded-bottom '}>
                    {subjects? subjects.map((subject) => {return <Subject key={uuidv4()} subject={subject} userData={userData}/>})  : <div className='h6 text-center py-4'>No subjects found.</div>}
                </div>
                
            </Modal.Body>

            <Modal.Footer className='border-top-0 pt-0 px-4 mx-1'>

                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>

            </Modal.Footer>
        </Modal>
    ); 
}
export default ViewSubjectsModal;


function Subject({subject, userData}){

    const dispatch = useDispatch();
    const [componentState, setComponentState] = useState({
        deleteClicked: false,
        deleting: false,
        error: null
    });

    useEffect(() => {
        if(componentState.deleting){
            handleDelete(subject, userData, setComponentState, dispatch);
        }
    }, [userData, dispatch, componentState.deleting, subject])

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

            <div className="col-12 px-3 text center"> 
                    {componentState.error &&
                        <div className="alert alert-danger" role="alert">
                            Error: {componentState.error}
                        </div>
                    }
                </div>
            <div className="d-flex justify-content-end">
                <button disabled={componentState.deleting} onClick={() => handleDeleteClick(componentState, setComponentState)} className='btn btn-danger'>
                    {(!componentState.deleteClicked && !(componentState.deleting || componentState.deleted)) && 'Delete'} 
                    {componentState.deleteClicked && 'Warning! This will delete associated tasks/classes. Click to confirm deletion'}
                    {componentState.deleting && 'Deleting class...'}
                </button>
            </div>
        </div>
    );
}


function handleDeleteClick(componentState, setComponentState){

    if(!componentState.deleteClicked){
        setComponentState({
            deleteClicked: true,
            deleting: false,
            error: null
        });

    } else if(componentState.deleteClicked){
        setComponentState({
            deleteClicked: false,
            deleting: true,
            error: null
        });
    }
}


async function handleDelete(subject, userData, setComponentState, dispatch){

    const userDataPayload = deleteSubject(subject, userData);
    const componentState = {
        deleteClicked: false,
        deleting: false,
        error: null
    }

    try {
        await updateUserData(userDataPayload, dispatch);

    } catch (error) {
        if(error.message === 'Network Error'){
            componentState.error = "Connection to the server failed, if problem persists, restart the application.";
        } else if (error.response.data.message){
            componentState.error = error.response.data.message;
        } else {
            componentState.error = 'An unknown error has occured.'
        }
        console.log({error: error});
        setComponentState(componentState);
    }
    
}
