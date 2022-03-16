import axios from 'axios';

function login(credentials) {
    return axios.post(`/api/auth/login`, credentials);
}

const authApi = { login };
export default authApi