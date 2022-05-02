import styled from 'styled-components';
import { Navigate } from 'react-router-dom';

import Page from '../Page/Page';
import LoginForm from '../../components/form/LoginForm/LoginForm';
import { useAuth } from '../../contexts/AuthContext/AuthContext';

export default function LoginPage(props) {
    const auth = useAuth();
    
    const handleLogin = async (credentials, callback) => {
        await auth.login(credentials);
        callback();
    }

    const handleGuestLogin = async (e) => {
        e.preventDefault();
        await auth.guestLogin();
    }

    if(!auth.loading && auth.user) return <Navigate to="/" />

    return (
        <LoginPageContainer>
            <h1>Log In</h1>
            {auth.loading ?
                <p>Loading...</p> :
                <>
                    <LoginForm onSubmit={handleLogin} error={auth.error?.response?.data}/>
                    <p>Don't have an account? <LinkButton onClick={handleGuestLogin}>Click here</LinkButton> to login as a guest user!</p>
                </>
            }
        </LoginPageContainer>
    )
}

const LinkButton = styled.button`
    margin: 0;
    padding: 0;
    border: none;
    background: none;
    color: blue;

    :hover, :active {
        color: darkblue;
    }
`

const LoginPageContainer = styled(Page)`
    padding: 2rem;
    > h1 {
        margin-top: 4rem;
    }
`