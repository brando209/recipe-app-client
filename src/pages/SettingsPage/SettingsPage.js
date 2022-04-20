import React from 'react';
import styled from 'styled-components';
import Button from '../../components/input/Button/Button'
import Page from '../Page/Page';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { useAppContext } from '../../contexts/AppContext/AppContext';
import { useNavigate } from 'react-router-dom';
import { SelectInput } from '../../components/input';

const ThemeDisplay = ({ theme }) => {
    const themeColorComponents = [];

    for(let color in theme) {
        themeColorComponents.push(
            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                {color}
                <div style={{ width: "100%", height: "50px", backgroundColor: theme[color] }}></div>
            </div>
        )
    }

    return (
        <StyledThemedisplay>
            {themeColorComponents}
        </StyledThemedisplay>
    )
}

const StyledThemedisplay = styled.div`
    display: flex;
    flex-direction: row;
`

export default function SettingsPage(props) {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { theme, updateTheme } = useAppContext();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }
    console.log(user.theme);
    
    return (
        <Page>
            <h1>Account</h1>
            <h2>Details</h2>
            <p>Username: {user?.userName}</p>
            <hr/>
            <h2>Settings</h2>
            <label>Theme:&nbsp;&nbsp;</label>
            <SelectInput options={['dark', 'red', 'light', 'pink']} selected={user.theme} onChange={e => updateTheme(e.target.value)}/>
            {/* <ThemeDisplay theme={theme} /> */}
            <hr/>
            <Button onClick={handleLogout} variant="secondary">Log Out</Button>
        </Page>
    );
}   