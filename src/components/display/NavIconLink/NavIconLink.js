import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAppContext } from '../../../contexts/AppContext/AppContext';

export default function NavIconLink({ to, text = "", IconComponent, IconFillComponent, textOnHover=false, ...props }) {
    const { theme } = useAppContext();
    const { pathname } = useLocation();

    return (
        <StyledNavIconLink as={Link} to={to} $textOnHover={textOnHover} theme={theme} {...props}>
            {pathname === to ?
                <IconFillComponent size={25} /> :
                <IconComponent size={25} />
            }
            <span className="text">
                {text}
            </span>
        </StyledNavIconLink>
    );
}

const StyledNavIconLink = styled(Nav.Item)`
    display: flex;
    flex-direction: column;
    align-items: center;
    scroll-snap-align: start;
    min-width: 25%;
    color: ${props => props.theme.main};
    text-decoration: none;

    .text {
        opacity: ${({ $textOnHover }) => $textOnHover ? 0 : 1};
        white-space: normal;
        width: 75%;
    }

    :hover {
        color: ${props => props.theme.accent};
        cursor: pointer;

        .text {
            opacity: 1;
        }
    }

    @media (min-width: 428px) {
        min-width: 20%;
    }

    @media (min-width: 768px) {
        min-width: 15%;
    }
`