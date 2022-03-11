import styled from 'styled-components';
import Navbar from 'react-bootstrap/Navbar';
import NavLinks from '../NavLinks/NavLinks';
import { useAuth } from '../../../contexts/AuthContext/AuthContext';
import { useAppContext } from '../../../contexts/AppContext/AppContext';


export default function BottomNav(props) {
    const auth = useAuth();
    const { navbar } = useAppContext();

    if(!auth.user) return null;

    return (
        <StyledBottomNav fixed="bottom" $show={navbar.show}>
            <NavLinks />
        </StyledBottomNav>
    )
}

const StyledBottomNav = styled(Navbar)`
    background-color: var(--color-red);
    border-top: 1px solid #5c636a;

    display: ${({ $show }) => $show ? "initial" : "none" };

    @media (min-width: 1024px) {
        display: none;
    }

`