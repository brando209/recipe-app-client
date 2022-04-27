import { forwardRef } from 'react';
import styled from 'styled-components';

const Button = forwardRef((props, ref) => {
    const { children, variant="primary", active=false, type="button", ...otherProps } = props;
    return <StyledButton ref={ref} variant={variant} active={active} type={type} {...otherProps}>{children}</StyledButton>
});

const getColor = (theme, active, variant) => {
    if(active) return variant === "secondary" ? theme.contrast : theme.main;
    return variant === "secondary" ? theme.main : theme.contrast;
}

const getBackgroundColor = (theme, active, variant) => {
    if(active) return variant === "secondary" ? theme.main : theme.accent;
    return variant === "secondary" ? theme.accent : theme.main;
}

const StyledButton = styled.button`
    font-size: 1rem;
    padding: 0.25rem 1rem;
    border-radius: 4px;

    background-color: ${props => getBackgroundColor(props.theme, props.active, props.variant)};
    color: ${props => getColor(props.theme, props.active, props.variant)};
    border: 1px solid ${props => props.theme.main};

    :hover {
        background-color: ${props => props.variant === "secondary" ? props.theme.main : props.theme.accent};
        color: ${props => props.variant === "secondary" ? props.theme.contrast : props.theme.main};
        cursor: pointer;
    }

    :active {
        background-color: ${props => props.variant === "secondary" ? props.theme.secondary : props.theme.contrast};
        color: ${props => props.variant === "secondary" ? props.theme.contrast : props.theme.main};
    }
`
export default Button;