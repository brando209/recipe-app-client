import styled from 'styled-components';
import { Field } from 'formik';
import { XSquare } from 'react-bootstrap-icons';
import { SelectInput } from '..';

export default function IngredientInput({ index, arrayHelpers }) {
    return (
        <StyledIngredientInput>
            <IngredientInputLeft>
                <Field
                    name={`ingredients.${index}.name`} type="input" placeholder={`Ingredient #${index + 1}`}
                />
                <Field
                    name={`ingredients.${index}.quantity`} type="number" placeholder="Amount" min={0} step={0.01}
                />
            </IngredientInputLeft>
            <IngredientInputMiddle>
                <Field
                    as={SelectInput} size="sm" options={['small', 'medium', 'large']}
                    name={`ingredients.${index}.size`} placeholder="size"
                    variant="secondary"
                />
                <Field
                    as={SelectInput} size="sm" options={[
                        'teaspoon', 'tablespoon', 'cup',
                        'ounce', 'pound', 'milligram', 'gram', 'kilogram',
                        'liter', 'milliliter', 'quart', 'pint', 'gallon',
                        'pinch', 'piece',
                        'slice', 'stick', 'clove',
                        'can', 'box', 'bag', 'package'
                    ]}
                    name={`ingredients.${index}.unit`} placeholder="unit"
                    variant="secondary"
                />
            </IngredientInputMiddle>
            <IngredientInputRight>
                <XSquare onClick={() => arrayHelpers.remove(index)}/>
            </IngredientInputRight>
            <IngredientInputBottom>
                <Field name={`ingredients.${index}.comment`} type="input" placeholder={"Additional info"}/>
            </IngredientInputBottom>
        </StyledIngredientInput>
    )
}

const StyledIngredientInput =styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 5px;
    margin: 0.25rem auto;
    border: 2px solid var(--color-red);
    border-radius: 5px;
    padding: 0.5rem;
    background-color: var(--color-white);    
    max-width: 450px;
    width: 100%;
`

const IngredientInputLeft =styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.5;
    > input {
        width: 100%;
        margin: 0.25rem auto;
    }
`
const IngredientInputMiddle =styled.div`
    flex: 0.3;
    > select {
        width: 100%;
        margin: 0.25rem auto;
        height: 30px;
    }
`
const IngredientInputRight =styled.div`
    flex: 0.1;
    > svg {
        line-height: 1rem;
        color: var(--color-red)
    }
    > svg:hover {
        cursor: pointer;
    }
`
const IngredientInputBottom =styled.div`
    flex-basis: 100%;
    > input {
        width: 100%;
        margin-top: 0.25rem;
    }
`