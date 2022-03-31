import axios from 'axios';

async function registerUser(registrationPayload){

    return await axios.post('http://localhost:8086/register', registrationPayload);
}

export default registerUser;