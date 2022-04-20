import React, { createContext, useContext } from 'react';
import useResource from '../../hooks/useResource';
import authApi from '../../api/auth';
import { getLocalAuthToken, setLocalAuthToken, removeLocalAuthToken } from '../../utility/localStorage/authStorage';

export const authContext = createContext({});

export const useAuth = () => useContext(authContext);

const currentToken = getLocalAuthToken();

export default function AuthContextProvider({ children }) {
    const { loading, error, value, setLoading, setError, setValue } = useResource(
        '/api/auth/login',
        { headers: { authorization: `BEARER ${currentToken}` } },
        true,
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

    const guestLogin = async function () {
        try {
            setLoading(true);
            setValue(null);
            setError(null);
            const guest = await authApi.guestLogin();
            setValue(guest.data);
            setLocalAuthToken(guest.data.token);
        } catch(err) {
            setError(err);
        }
        setLoading(false);
    }

    const logout = async () => {
        try{
            if(value.type === "guest") await authApi.logout(value.token);
        } catch(err) {
            setError(err);
        }
        setValue(null);
        removeLocalAuthToken();
    }

    const updateTheme = (name) => {
        setValue(prev => ({...prev, theme: name }));
        authApi.updateAccount({ theme: name }, value.token);
    }

    return (
        <authContext.Provider value={{ loading, error, user: value, login, guestLogin, logout, updateTheme }}>
            {children}
        </authContext.Provider>
    )
}