import { 
    House, HouseFill, 
    PlusCircle, PlusCircleFill, 
    Heart, HeartFill, 
    Gear, GearFill 
} from 'react-bootstrap-icons';
import NavIconLink from '../../display/NavIconLink/NavIconLink';
import styled from 'styled-components';

export default function NavLinks({ className, textOnHover, ...props }) {
    return (
        <StyledNavLinks className={className || ""} {...props}>
            <NavIconLink to="/" text="Home" IconComponent={House} IconFillComponent={HouseFill} textOnHover={textOnHover} />
            <NavIconLink to="/favorites" text="Favorites" IconComponent={Heart} IconFillComponent={HeartFill} textOnHover={textOnHover} />
            <NavIconLink to="/new" text="New" IconComponent={PlusCircle} IconFillComponent={PlusCircleFill} textOnHover={textOnHover} />
            <NavIconLink to="/settings" text="Settings" IconComponent={Gear} IconFillComponent={GearFill} textOnHover={textOnHover} />
        </StyledNavLinks>
    )
}

const StyledNavLinks = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
    min-width:  ${props => props.minWidth || '100%'};
    max-width: ${props => props.maxWidth || '100%'};
`