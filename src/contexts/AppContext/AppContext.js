import React, { createContext, useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
export const appContext = createContext({});

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
    const [navbar, setNavbar] = useState({ show: false });

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
            navbar, showNavbar, hideNavbar
        }}>
            {children}
        </appContext.Provider>
    )
}