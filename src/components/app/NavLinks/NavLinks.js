import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { 
    House, HouseFill, 
    PlusCircle, PlusCircleFill, 
    Heart, HeartFill, 
    Gear, GearFill 
} from 'react-bootstrap-icons';

import NavIconLink from '../../display/NavIconLink/NavIconLink';

export default function NavLinks() {
    return (
        <Nav className="nav-links">
            <NavIconLink to="/" text="Home" IconComponent={House} IconFillComponent={HouseFill} />
            <NavIconLink to="/favorites" text="Favorites" IconComponent={Heart} IconFillComponent={HeartFill} />
            <NavIconLink to="/new" text="New" IconComponent={PlusCircle} IconFillComponent={PlusCircleFill} />
            <NavIconLink to="/settings" text="Settings" IconComponent={Gear} IconFillComponent={GearFill} />
        </Nav>
    )
}