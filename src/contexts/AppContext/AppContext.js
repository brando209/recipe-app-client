import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useAuth } from '../AuthContext/AuthContext';
import Button from '../../components/input/Button/Button';

export const appContext = createContext({});

const themes = {
    light: {
        main: '#5d5d5d',
        secondary: '#9e9e9e',
        accent: '#dedede',
        contrast: '#fffefc',
    },
    dark: {
        main: '#121212',
        secondary: '#1f1f1f',
        accent: '#353432',
        contrast: '#a8a8a8',
    },
    red: {
        main: '#8b0000',
        secondary: '#ba0000',
        accent: '#d00000',
        contrast: '#e50000',
    },
    pink: {
        main: '#ff084a',
        secondary: '#ff6289',
        accent: '#ff93ac',
        contrast: '#ffc2cd',
    },
}
const useTheme = (initialTheme) => {
    const auth = useAuth();
    const [theme, setTheme] = useState(themes[initialTheme]);

    useEffect(() => {
        setTheme(themes[auth.user?.theme] || themes[initialTheme]);
    }, [auth.user?.theme]);

    const updateTheme = (name) => {
        switch(name) {
            case 'red':
                setTheme(themes.red);
                auth.updateTheme(name);
                break;
            case 'pink':
                setTheme(themes.pink);
                auth.updateTheme(name);
                break;
            case 'dark':
                setTheme(themes.dark);
                auth.updateTheme(name);
                break;
            case 'light':
            default:
                setTheme(themes.light);
                auth.updateTheme('light');
                break;
        }
    }

    return [theme, updateTheme];
}

export const useAppContext = () => useContext(appContext);

export default function AppContextProvider({ children }) {
    const [dialog, setDialog] = useState({
        show: false,
        title: "Dialog Box",
        text: "Dialog body text",
        body: <div>Body component</div>,
        footer: <Button>Close</Button>,
    });
    const [sidebar, setSidebar] = useState({ show: false });
    const [navbar, setNavbar] = useState({ show: true });
    const [theme, updateTheme] = useTheme('light');

    const showDialog = () => setDialog(prev => ({ ...prev, show: true }));
    const hideDialog = () => setDialog(prev => ({ ...prev, show: false }));

    const showSidebar = () => setSidebar(prev => ({ ...prev, show: true }));
    const hideSidebar = () => setSidebar(prev => ({ ...prev, show: false }));

    const showNavbar = () => setNavbar(prev => ({ ...prev, show: true }));
    const hideNavbar = () => setNavbar(prev => ({ ...prev, show: false }));

    return (
        <appContext.Provider value={{ 
            dialog, setDialog, showDialog, hideDialog,
            sidebar, showSidebar, hideSidebar,
            navbar, showNavbar, hideNavbar,
            theme, updateTheme
        }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </appContext.Provider>
    )
}