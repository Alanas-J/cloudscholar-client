import axios from 'axios';
import { updateUserState } from '../../state/slices/userState'
import refreshAuthToken from './refreshAuthToken'

async function fetchUserData(dispatch){
    const token = window.sessionStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    let response;
    try {
        response = await axios.get(process.env.REACT_APP_API_URL+'/user_data', config);

    } catch (e){

        if(e.response && window.sessionStorage.getItem('refresh_token')){
            if(e.response.status === 418){

                await refreshAuthToken();
                await fetchUserData(dispatch);
                return;
            }

        } else {
            throw e;
        }
    }
    
    dispatch(updateUserState({
        loggedIn: true,
        userData: response.data
    }));
}

export default fetchUserData;