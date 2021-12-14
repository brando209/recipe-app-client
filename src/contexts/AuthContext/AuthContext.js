import React, { createContext, useContext } from 'react';
import useResource from '../../hooks/useResource';
import authApi from '../../api/auth';
import { getLocalAuthToken, setLocalAuthToken } from '../../utility/localStorage/authStorage';

export const authContext = createContext({});

export const useAuth = () => useContext(authContext);

const currentToken = getLocalAuthToken();

export default function AuthContextProvider({ children }) {
    const { loading, error, value, setLoading, setError, setValue } = useResource(
        'http://localhost:3005/api/auth/login',
        { headers: { authorization: `BEARER ${currentToken}` } },
        [currentToken]
    );

    const login = async (credentials) => {
        try {
            setLoading(true);
            setValue(null);
            setError(null);
            const user = await authApi.login(credentials);
            setValue(user.data);
            setLocalAuthToken(user.data.token);
        } catch(err) {
            setError(err);
        }
        setLoading(false);
    }

    return (
        <authContext.Provider value={{ loading, error, user: value, login }}>
            {children}
        </authContext.Provider>
    )
}