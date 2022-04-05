import axios from 'axios'

async function loginUser(email, password, keepUserSigned){

    const response = await axios.post(process.env.REACT_APP_API_URL+'/login', {
            email: email,
            password: password,
        });

    if(keepUserSigned){
        window.localStorage.setItem('token', response.data.token);
        window.localStorage.setItem('refresh_token', response.data.refresh_token);
    }

    window.sessionStorage.setItem('token', response.data.token);
    window.localStorage.setItem('refresh_token', response.data.refresh_token);

}
export default loginUser;