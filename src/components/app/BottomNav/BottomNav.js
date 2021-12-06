import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavLinks from '../NavLinks/NavLinks';
import useMediaQuery from '../../../hooks/useMediaQuery';

import './BottomNav.css';

export default function BottomNav(props) {
    const shouldDisplay = useMediaQuery("(max-width: 1080px)");

    return (
        <Navbar className={`bottom-bar ${shouldDisplay ? "" : "hide"}`} fixed="bottom">
            <NavLinks />
        </Navbar>
    )

}