import styled from 'styled-components';

export default function InputContainer({ name, label, children }) {
    return (
        <StyledInputContainer numElements={children?.length}>
            {label && <span>
                <label htmlFor={name}>{label}</label>{": "}
            </span>}
            <div>
                {children}
            </div>
        </StyledInputContainer>
    );
}

const StyledInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0.5rem auto;
    > span {
        font-weight: bold;
        display: flex;
        justify-content: flex-start;
    }
    > div {
        text-align: left;
        > input, > select, > textarea {
            width: 100%;
        }
    }

    @media (min-width: 428px) {
        flex-direction: row;
        > span {
            flex: 0.3;
            justify-content: flex-end;
        }
        > div {
            flex: 1;
            margin-left: 2rem;
        }
    }

    @media (min-width: 1024px) {
        > span {
            flex: 0.4;
        }
    }
`
