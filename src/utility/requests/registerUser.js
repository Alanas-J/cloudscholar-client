import axios from 'axios';

async function registerUser(registrationPayload){

    return await axios.post(process.env.REACT_APP_API_URL+'register', registrationPayload);
}

export default registerUser;