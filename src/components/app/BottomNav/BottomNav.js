import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { House, HouseFill, PlusCircle, PlusCircleFill, Heart, HeartFill, Gear, GearFill } from 'react-bootstrap-icons';

import './BottomNav.css';

function NavIconLink({ to, text = "", IconComponent, IconFillComponent }) {
    const { pathname } = useLocation();
    return (
        <Nav.Item as={Link} to={to} className="nav-link">
            {pathname === to ?
                <IconFillComponent size={40} className="mx-2" /> :
                <IconComponent size={40} className="mx-2" />
            } {text}
        </Nav.Item>
    );
}

export default function BottomNav(props) {
    return (
        <Navbar className="bottom-bar" fixed="bottom">
            <Nav className="bottom-bar-nav">
                <NavIconLink to="/" text="Home" IconComponent={House} IconFillComponent={HouseFill} />
                <NavIconLink to="/favorites" text="Favorites" IconComponent={Heart} IconFillComponent={HeartFill} />
                <NavIconLink to="/new" text="New" IconComponent={PlusCircle} IconFillComponent={PlusCircleFill} />
                <NavIconLink to="/settings" text="Settings" IconComponent={Gear} IconFillComponent={GearFill} />
            </Nav>
        </Navbar>
    )

}