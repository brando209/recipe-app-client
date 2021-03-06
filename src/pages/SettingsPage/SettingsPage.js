import React from 'react';
import Button from '../../components/input/Button/Button'
import Page from '../Page/Page';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { useAppContext } from '../../contexts/AppContext/AppContext';
import { useNavigate } from 'react-router-dom';
import { SelectInput } from '../../components/input';

export default function SettingsPage(props) {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { updateTheme } = useAppContext();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }
    
    return (
        <Page>
            <h1>Account</h1>
            <h2>Details</h2>
            <p>Username: {user?.userName}</p>
            <hr/>
            <h2>Settings</h2>
            <label>Theme:&nbsp;&nbsp;</label>
            <SelectInput options={['dark', 'red', 'light', 'pink']} selected={user.theme} onChange={e => updateTheme(e.target.value)}/>
            <hr/>
            <Button onClick={handleLogout} variant="secondary">Log Out</Button>
        </Page>
    );
}   