import styled from 'styled-components';
import { Field } from 'formik';
import { Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
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
            <Button className="remove-category-btn" variant="secondary" size='sm' onClick={() => arrayHelpers.remove(index)}>
                <Trash />
            </Button>
        </StyledCategoryInput>
    )
}

const StyledCategoryInput = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 450px;
    margin: 0.25rem auto;

    > button {
        flex: 0.1;
        line-height: 1rem;
    }

    @media (min-width: 428px) {
        justify-content: flex-end;
        padding-left: 5rem;
        width: 90%;
    }

    @media (min-width: 768px) {
        padding-left: 7rem;
    }

    @media (min-width: 1024px) {
        margin-left: 40vw;
    }
`

const NameInputContainer = styled.div`
    flex: 0.6;
    > input {
        width: 100%;
    }
`

const TypeInputContainer = styled.div`
    flex: 0.4;
    > select {
        width: 100%;
        max-width: 100px;
    }
`