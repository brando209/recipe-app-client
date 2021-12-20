import axios from 'axios';

function login(credentials) {
    return axios.post(`/api/auth/login`, credentials);
}

export default { login };