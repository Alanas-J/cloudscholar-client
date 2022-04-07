import axios from 'axios';

async function refreshAuthToken(){

    const token = window.sessionStorage.getItem('token');
    const refresh_token = window.sessionStorage.getItem('refresh_token');

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const response = await axios.post(process.env.REACT_APP_API_URL+'/refresh_token', 
        {refresh_token: refresh_token},
        config);

    if(window.localStorage.getItem('token') ===  token ){
        window.localStorage.setItem('token', response.data.token);
        window.localStorage.setItem('refresh_token', response.data.refresh_token);
    }
    window.sessionStorage.setItem('token', response.data.token);
    window.sessionStorage.setItem('refresh_token', response.data.refresh_token);
    
}
export default refreshAuthToken;