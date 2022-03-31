import AddClassModal from './add_modals/AddClassModal';
import AddSubjectModal from './add_modals/AddSubjectModal';
import AddTaskModal from './add_modals/AddTaskModal';
import AddQuickShortcutModal from './add_modals/AddQuickShortcutModal';
import RegisterUserModal from './add_modals/RegisterUserModal';

import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../state/slices/modalState';
import ViewClassModal from './view_modals/ViewClass';



function ModalManager() {
    const modalState = useSelector(state => state.modalState.value);
    const dispatch = useDispatch();

    return (
        <div>{modalSwitch(modalState.currState, () => dispatch(closeModal()))}</div>
    ); 
  }
  export default ModalManager;



// Used to pick what to display.
function modalSwitch(modal, closeModal){
    switch(modal.name) {
        
        case 'AddClass':
            return <AddClassModal show={true} handleClose={closeModal}/>;

        case 'AddSubject':
            return <AddSubjectModal show={true} handleClose={closeModal}/>;
            
        case 'AddTask':
            return <AddTaskModal show={true} handleClose={closeModal}/>;

        case 'AddQuickShortcut':
            return <AddQuickShortcutModal show={true} handleClose={closeModal}/>;

        case 'RegisterUser':
            return <RegisterUserModal show={true} handleClose={closeModal}/>

        case 'ViewClass':
            return <ViewClassModal data={modal.data} show={true} handleClose={closeModal}/>
        
        case 'ViewTask':
            return <RegisterUserModal show={true} handleClose={closeModal}/>

        case 'ViewSubject':
            return <RegisterUserModal show={true} handleClose={closeModal}/>
    
            
            
        default:
            return null;
    }
  
  }

  