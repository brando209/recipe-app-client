import axios from 'axios';
import { authHeader } from './utils';

function login(credentials) {
    return axios.post('/api/auth/login', credentials);
}

function guestLogin() {
    return axios.get('/api/auth/guest');
}

function logout(authToken) {
    return axios.get('/api/auth/logout', { headers: authHeader(authToken) });
}

function updateAccount(updates, authToken) {
    return axios.patch('/api/user', updates, { headers: authHeader(authToken) });
}

const authApi = { login, guestLogin, logout, updateAccount };
export default authApi