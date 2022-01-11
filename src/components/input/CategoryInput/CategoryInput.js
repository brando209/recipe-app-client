import React from 'react';
import { Field } from 'formik';
import { Row, Col, Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { SelectInput } from '..';

import './CategoryInput.css';

export default function CategoryInput({ index, arrayHelpers }) {
    return (
        <Row className="category-input">
            <Col xs={6}>
                <Field
                    name={`categories.${index}.name`} type="input" placeholder={`Category #${index + 1}`}
                />
            </Col>
            <Col xs={4}>
                <Field
                    as={SelectInput} options={['other', 'flavor', 'meal', 'dish', 'cuisine']}
                    name={`categories.${index}.type`}
                    variant="secondary"
                />
            </Col>
            <Col xs={2}>
                <Button className="remove-category-btn" variant="secondary" onClick={() => arrayHelpers.remove(index)}>
                    <Trash />
                </Button>
            </Col>
        </Row>
    )
}