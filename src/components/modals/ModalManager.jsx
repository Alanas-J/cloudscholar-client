import AddClassModal from './add_modals/AddClassModal';
import AddSubjectModal from './add_modals/AddSubjectModal';
import AddTaskModal from './add_modals/AddTaskModal';
import AddQuickShortcutModal from './add_modals/AddQuickShortcutModal';

import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../state/slices/modalState';



function ModalManager() {
    const modalState = useSelector(state => state.modalState.value);
    const dispatch = useDispatch();

    return (
        <div>{modalSwitch(modalState.currState, () => dispatch(closeModal()))}</div>
    ); 
  }
  export default ModalManager;



// Used to pick what to display.
function modalSwitch(display, closeModal){
    switch(display) {
      
        case 'AddClass':
            return <AddClassModal show={display=='AddClass'} handleClose={closeModal}/>;

        case 'AddSubject':
            return <AddSubjectModal show={display=='AddSubject'} handleClose={closeModal}/>;
            
        case 'AddTask':
            return <AddTaskModal show={display=='AddTask'} handleClose={closeModal}/>;
            
        case 'AddQuickShortcut':
            return <AddQuickShortcutModal show={display=='AddQuickShortcut'} handleClose={closeModal}/>;
        
        case 'AddModule':
            return null;
        
        default:
            return null;
    }
  
  }

  