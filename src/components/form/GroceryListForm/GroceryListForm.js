import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import InputList from '../../input/InputList/InputList';
import { XSquare } from 'react-bootstrap-icons';

function GroceryListForm() {
    return (
        <Formik
            initialValues={{ items: [] }}
        >{({ values, setFieldValue }) => (
            <Form>
                <InputList
                    name="items"
                    listItems={values.items}
                    initialItemValue={{ checked: false, name: "" }}
                    buttonPlacement="bottom center"
                    buttonText="Add Grocery Item"
                    buttonVariant="outline-secondary"
                    renderItem={(item, index, arrayHelpers) => (
                        <GroceryListItem>
                            <Field name={`items.${index}.checked`} type="checkbox" />
                            <Field name={`items.${index}.name`} type="input" placeholder={`Item #${index + 1}`} />
                            <XSquare onClick={() => arrayHelpers.remove(index)} />
                        </GroceryListItem>
                    )}
                />
            </Form>
        )}</Formik>
    )
}

export default GroceryListForm

const GroceryListItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0.5rem auto;
    gap: 10px;

    > input {
        width: 100%;
    }

    > input:first-child {
        flex: 1;
        height: 2rem;
        color: red;
        background-color: red;
    }
    > input:first-child:hover {
        cursor: pointer;
    }

    >input:nth-child(2) {
        flex: 10;
    }

    > svg {
        color: var(--color-red);
        font-size: 2rem;
    }
    > svg:hover {
        cursor: pointer;
    }
`