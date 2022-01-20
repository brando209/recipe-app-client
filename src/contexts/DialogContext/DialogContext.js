import React, { createContext, useContext, useState } from 'react';
import { Button } from 'react-bootstrap';

export const dialogContext = createContext({});

export const useDialogContext = () => useContext(dialogContext);

export default function DialogContextProvider({ children }) {
    const [show, setShow] = useState(false);
    const [dialog, setDialog] = useState({
        title: "Dialog Box",
        text: "Dialog body text",
        body: <div>Body component</div>,
        footer: <Button>Close</Button>,
    })

    return (
        <dialogContext.Provider value={{ dialog, setDialog, show, setShow }}>
            {children}
        </dialogContext.Provider>
    )
}