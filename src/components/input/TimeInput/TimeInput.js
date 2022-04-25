import styled from 'styled-components';
import { FieldArray, Field } from 'formik';

export default function TimeInput({ name, ...props }) {
    return (
        <FieldArray
            name={name}
            render={array => (
                <StyledTimeInput>
                    <StyledField>
                        <label>Days:</label>
                        <Field type="number" {...props} value={props.value.days} name={`${name}.days`} min="0" max="30" step="1" placeholder="Days" />
                    </StyledField>
                    <StyledField>
                        <label>Hours:</label>
                        <Field type="number" {...props} value={props.value.hours} name={`${name}.hours`} min="0" max="24" step="1" placeholder="Hours" />
                    </StyledField>
                    <StyledField>
                        <label>Minutes:</label>
                        <Field type="number" {...props} value={props.value.minutes} name={`${name}.minutes`} min="0" max="60" step="1" placeholder="Minutes" />
                    </StyledField>
                </StyledTimeInput>
            )}
        />
    )
}

const StyledField = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    >input {
        width: 4rem;
        margin-left: 0.5rem;
    };
`

const StyledTimeInput = styled.div`
    display: flex;
    gap: 0.75rem;
`