import React from 'react';
import { Field } from 'formik';
import { Row, Col, Button } from 'react-bootstrap';
import { SelectInput } from '..';

import './IngredientInput.css';

export default function IngredientInput({ index, arrayHelpers }) {
    return (
        <Row className="ingredient-input">
            <Col xs={6}>    
                <Field 
                    name={`ingredients.${index}.name`} type="input" placeholder={`Ingredient #${index+1}`}
                />
                <Field 
                    name={`ingredients.${index}.amount`} type="number" placeholder="Amount" 
                />
            </Col>
            <Col xs={4}>
                <Field
                    as={SelectInput} options={['small', 'medium', 'large']}
                    name={`ingredients.${index}.size`} placeholder="size"
                    variant="secondary"
                />
                <Field
                    as={SelectInput} options={['teaspoon','tablespoon','cup','ounce','pound','gram']}
                    name={`ingredients.${index}.measurement`} placeholder="unit"
                    variant="secondary"
                />
            </Col>
            <Col xs={2}>
                <Button className="add-ingredient-btn" variant="secondary" onClick={() => arrayHelpers.remove(index)}>-</Button>
            </Col>
        </Row>
    )
}