import styled from 'styled-components';
import Navbar from 'react-bootstrap/Navbar';
import NavLinks from '../NavLinks/NavLinks';
import { useAuth } from '../../../contexts/AuthContext/AuthContext';


export default function BottomNav(props) {
    const auth = useAuth();

    if(!auth.user) return null;

    return (
        <StyledBottomNav fixed="bottom">
            <NavLinks />
        </StyledBottomNav>
    )
}

const StyledBottomNav = styled(Navbar)`
    background-color: var(--color-red);
    border-top: 1px solid #5c636a;

    @media (min-width: 1024px) {
        display: none;
    }

`