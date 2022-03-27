import axios from 'axios';
import { updateUserState } from '../../state/slices/userState'
import refreshAuthToken from './refreshAuthToken'

async function updateUserData(newUserData, dispatch){

    console.log('update userdata called.');
    console.log(newUserData);

    const token = window.sessionStorage.getItem('token');

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    let response;
    try {
        response = await axios.post('http://localhost:8086/user_data', newUserData, config);

    } catch (e){

        if(e.response && window.sessionStorage.getItem('refresh_token')){
            if(e.response.status === 418){

                await refreshAuthToken();
                await updateUserData(newUserData, dispatch);
            }

        } else {
            throw e;
        }
    }
    
    dispatch(updateUserState({
        loggedIn: true,
        userData: response.data.user_data
    }));
}

export default updateUserData;