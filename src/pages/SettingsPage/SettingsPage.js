import React from 'react';
import { Button } from 'react-bootstrap';
import Page from '../Page/Page';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage(props) {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }
    
    return (
        <Page>
            <h1>Settings</h1>

            <Button onClick={handleLogout} variant="secondary">Log Out</Button>
        </Page>
    );
}