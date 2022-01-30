import AddClassModal from './AddClassModal';

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

        case 'AddModule':
            return null;
            
        case 'AddTask':
            return null;
            
        case 'AddQuickShortcut':
            return null;
        
        case 'AddModule':
            return null;
        
        default:
            return null;
    }
  
  }

  