import styled from 'styled-components';

export default function InputContainer({ name, label, children }) {
    return (
        <StyledInputContainer numElements={children?.length}>
            {label && <span>
                <label htmlFor={name}>{label}</label>{": "}
            </span>}
            <div>
                {children.length > 0 ? children.map(child => <div>{child}</div>) : children}
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
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        
        > input, > select,  > textarea, > div > input, > div > select, > div > textarea {
            width: 100%;
        }
        
        > div { /* If there are multiple children, each will be in a div with this target */
            flex: ${props => 1 / props.numElements};
            padding: 0 0.25rem;

            :first-child {
                padding-left: 0; 
            }

            :last-child {
                padding-right: 0;
            }
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
