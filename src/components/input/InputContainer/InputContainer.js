import styled from 'styled-components';

export default function InputContainer({ name, label, children }) {
    return (
        <StyledInputContainer>
            <span>
                <label htmlFor={name}>{label}</label>{": "}
            </span>
            <div>
                {children}
            </div>
        </StyledInputContainer>
    );
}

const StyledInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem auto;
    > span {
        font-weight: bold;
        display: flex;
        justify-content: flex-start;
    }
    > div {
        display: flex;
        margin-left: 2rem;
        justify-content: flex-start;

        > * {
            width: 100%;
            max-width: 350px;
            min-width: 150px;
        }
    }

    @media (min-width: 425px) {
        flex-direction: row;
        > span {
            flex: 0.3;
            justify-content: flex-end;
        }
        > div {
            flex: 0.7
        }
    }

    @media (min-width: 768px) {
        > span {
            flex: 0.5;
        }
    }
`
