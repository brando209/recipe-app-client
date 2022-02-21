import styled from 'styled-components';
import { Field } from 'formik';
import { XSquare } from 'react-bootstrap-icons';
import { SelectInput } from '..';

export default function CategoryInput({ index, arrayHelpers }) {
    return (
        <StyledCategoryInput>
            <NameInputContainer>
                <Field
                    name={`categories.${index}.name`} type="input" placeholder={`Category #${index + 1}`}
                />
            </NameInputContainer>
            <TypeInputContainer>
                <Field
                    as={SelectInput} options={['other', 'flavor', 'meal', 'dish', 'cuisine']}
                    size="sm"
                    name={`categories.${index}.type`}
                    variant="secondary"
                />
            </TypeInputContainer>
            <XSquare onClick={() => arrayHelpers.remove(index)} />
        </StyledCategoryInput>
    )
}

const StyledCategoryInput = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
    width: 100%;
    max-width: 450px;
    margin: 0.25rem auto;

    > svg {
        flex: 1;
        color: var(--color-red)
    }

    > svg:hover {
        cursor: pointer;
    }

    @media (min-width: 428px) {
        justify-content: flex-end;
        width: 90%;
    }
`

const NameInputContainer = styled.div`
    flex: 6;
    > input {
        width: 100%;
    }
`

const TypeInputContainer = styled.div`
    flex: 4;
    > select {
        width: 100%;
        max-width: 100px;
    }
`