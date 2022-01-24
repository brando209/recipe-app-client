import React from 'react';
import { Field } from 'formik';
import { Row, Col, Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { SelectInput } from '..';

import './IngredientInput.css';

export default function IngredientInput({ index, arrayHelpers }) {
    return (
        <Row className="ingredient-input">
            <Col xs={6}>
                <Field
                    name={`ingredients.${index}.name`} type="input" placeholder={`Ingredient #${index + 1}`}
                />
                <Field
                    name={`ingredients.${index}.amount`} type="number" placeholder="Amount" min={0} step={0.01}
                />
            </Col>
            <Col xs={4}>
                <Field
                    as={SelectInput} options={['small', 'medium', 'large']}
                    name={`ingredients.${index}.size`} placeholder="size"
                    variant="secondary"
                />
                <Field
                    as={SelectInput} options={[
                        'teaspoon', 'tablespoon', 'cup',
                        'ounce', 'pound', 'milligram', 'gram', 'kilogram',
                        'liter', 'milliliter', 'quart', 'pint', 'gallon',
                        'pinch', 'piece',
                        'slice', 'stick', 'clove',
                        'can', 'box', 'bag', 'package'
                    ]}
                    name={`ingredients.${index}.measurement`} placeholder="unit"
                    variant="secondary"
                />
            </Col>
            <Col xs={2}>
                <Button className="add-ingredient-btn" variant="secondary" onClick={() => arrayHelpers.remove(index)}>
                    <Trash />
                </Button>
            </Col>
            <Col xs={12}>
                <Field name={`ingredients.${index}.comment`} type="input" placeholder={"Additional info"}/>
            </Col>
        </Row>
    )
}