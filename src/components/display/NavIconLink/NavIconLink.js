import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from 'react-router-dom';

export default function NavIconLink({ to, text = "", IconComponent, IconFillComponent }) {
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