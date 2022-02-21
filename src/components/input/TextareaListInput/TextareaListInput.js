import styled from 'styled-components';
import { Field } from 'formik';
import { XSquare } from 'react-bootstrap-icons';

export default function TextareaListInput({ name, index, arrayHelpers, placeholder }) {
    return (
        <StyledTextareaListInput>
            <div>    
                <Field 
                    name={`${name}.${index}`} as="textarea" placeholder={`${placeholder} #${index+1}`} rows="3"
                />
            </div>
            <div>
                <XSquare onClick={() => arrayHelpers.remove(index)}/>
            </div>
        </StyledTextareaListInput>
    )
}

const StyledTextareaListInput = styled.div`
    display: flex;
    justify-content: space-around;
    gap: 5px;
    max-width: 450px;
    width: 100%;
    padding: 0.5rem;
    margin: 0.25rem auto;

    > div > svg {
        color: var(--color-red);
    }

    > div > svg:hover {
        cursor: pointer;
    }

    > div:first-child {
        flex: 0.9;
    }

    > div:nth-child(2) {
        flex: 0.1;
    }

    @media (min-width: 428px) {
        width: 90%;
    }

    @media (min-width: 768px) {
        width: 80%;
    }

    > div > textarea {
        width: 100%;
    }
`