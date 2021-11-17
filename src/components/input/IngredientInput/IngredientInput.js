import React from 'react';
import { Field } from 'formik';
import { Row, Col, Button } from 'react-bootstrap';
import { SelectInput } from '..';

export default function IngredientInput({ index, arrayHelpers }) {
    return (
        <Row>
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
                />
                <Field
                    as={SelectInput} options={['teaspoon','tablespoon','cup','ounce','pound','gram']}
                    name={`ingredients.${index}.measurement`} placeholder="unit"
                />
            </Col>
            <Col xs={2}>
                <Button className="add-ingredient-btn" onClick={() => arrayHelpers.remove(index)}>-</Button>
            </Col>
        </Row>
    )
}