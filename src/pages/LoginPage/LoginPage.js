import React from 'react';
import LoginForm from '../../components/form/LoginForm/LoginForm';
import Page from '../Page/Page';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { Navigate } from 'react-router-dom';

export default function LoginPage(props) {
    const auth = useAuth();
    const handleLogin = async (credentials, callback) => {
        await auth.login(credentials);
        callback();
    }

    if(!auth.loading && auth.user) return (
        <Navigate to="/" />
    )

    return (
        <Page className="form-page">
            <h3>Log In</h3>
            <LoginForm onSubmit={handleLogin} error={auth.error?.response.data}/>
        </Page>
    )
}