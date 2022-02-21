import {
    House, HouseFill,
    PlusCircle, PlusCircleFill,
    Heart, HeartFill,
    Gear, GearFill,
    Calendar3, Calendar3Fill,
    Bag, BagFill,
} from 'react-bootstrap-icons';
import NavIconLink from '../../display/NavIconLink/NavIconLink';
import styled from 'styled-components';

export default function NavLinks({ className, textOnHover, ...props }) {
    return (
        <StyledNavLinks className={className || ""} {...props}>
            <NavIconLink to="/" text="Home" IconComponent={House} IconFillComponent={HouseFill} textOnHover={textOnHover} />
            <NavIconLink to="/favorites" text="Favorites" IconComponent={Heart} IconFillComponent={HeartFill} textOnHover={textOnHover} />
            <NavIconLink to="/new" text="New" IconComponent={PlusCircle} IconFillComponent={PlusCircleFill} textOnHover={textOnHover} />
            <NavIconLink to="/grocery" text="Grocery" IconComponent={Bag} IconFillComponent={BagFill} textOnHover={textOnHover} />
            <NavIconLink to="/planner" text="Planner" IconComponent={Calendar3} IconFillComponent={Calendar3Fill} textOnHover={textOnHover} />
            <NavIconLink to="/settings" text="Settings" IconComponent={Gear} IconFillComponent={GearFill} textOnHover={textOnHover} />
        </StyledNavLinks>
    )
}

const StyledNavLinks = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    overflow-x: auto;
    white-space: nowrap;
    scroll-snap-type: x mandatory;
    min-width:  ${props => props.minWidth || '100%'};
    max-width: ${props => props.maxWidth || '100%'};

    -ms-overflow-style: none;  /* Hide scrollbar for IE and Edge */
    scrollbar-width: none;  /* Hide scrollbar for Firefox */
     /* Hide scrollbar for Chrome, Safari and Opera */
    ::-webkit-scrollbar {
        display: none;
    }

    @media (min-width: 768px) {
        justify-content: space-around;   
    }
`