import styled from 'styled-components';

const ButtonGroup = ({ children, ...props }) => {
    return <StyledButtonGroup {...props}>
        {children}
    </StyledButtonGroup>
}

const StyledButtonGroup = styled.div`
    display: flex;
    
    & :nth-child(n) {
        border-radius: 0;
    }

    & :first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
    }

    & :last-child {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    }
`

export default ButtonGroup;