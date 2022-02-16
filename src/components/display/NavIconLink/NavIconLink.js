import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

export default function NavIconLink({ to, text = "", IconComponent, IconFillComponent, textOnHover=false, ...props }) {
    const { pathname } = useLocation();

    return (
        <StyledNavIconLink as={Link} to={to} textOnHover={textOnHover} {...props}>
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
    width: 30px;
    color: #5c636a;
    text-decoration: none;

    .text {
        opacity: ${props => props.textOnHover ? 0 : 1};
    }

    :hover {
        color: #5c636a;
        cursor: pointer;

        .text {
            opacity: 1;
        }
    }
    
`