import React from 'react';
import { Field } from 'formik';
import { Row, Col, Button } from 'react-bootstrap';

import './TextareaListInput.css';

export default function TextareaListInput({ name, index, arrayHelpers, placeholder }) {
    return (
        <Row className="textarea-list-input">
            <Col xs={10}>    
                <Field 
                    name={`${name}.${index}`} as="textarea" placeholder={`${placeholder} #${index+1}`} 
                />
            </Col>
            <Col xs={2}>
                <Button variant="secondary" onClick={() => arrayHelpers.remove(index)}>-</Button>
            </Col>
        </Row>
    )
}