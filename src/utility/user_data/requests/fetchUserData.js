import axios from 'axios';
import { updateUserState } from '../../../state/slices/userState'

async function fetchUserData(dispatch){

    const token = window.sessionStorage.getItem('token');

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    // Try get user data
    const response = await axios.get('http://localhost:8086/user_data', config);
    
    dispatch(updateUserState({
        loggedIn: true,
        userData: response.data
    }));
    
    // console.log(response);
}

export default fetchUserData;