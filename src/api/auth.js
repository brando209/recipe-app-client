import axios from 'axios';

const authURL = 'http://localhost:3005/api/auth';

function login(credentials) {
    return axios.post(`${authURL}/login`, credentials);
}

export default { login };