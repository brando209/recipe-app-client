import styled from 'styled-components';
import { Field } from 'formik';
import { SelectInput } from '..';

const timeUnitOptions = ['min', 'hr'];

export default function TimeInput({ name }) {
    return (
        <StyledTimeInput>
            <Field name={`${name}.time`} type="number" min={1} />
            <Field name={`${name}.unit`} as={SelectInput} options={timeUnitOptions} />
        </StyledTimeInput>
    )
}

const StyledTimeInput = styled.div`
    display: flex;
    flex-wrap: wrap;
    >input {
        margin-right: 0.5rem;
    }

    > input, > select {
        min-width: 100px;
        max-width: 175px;
        flex: 1;
    }
`