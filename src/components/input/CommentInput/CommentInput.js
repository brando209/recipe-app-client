import React from 'react';
import { Field } from 'formik';
import { Row, Col, Button } from 'react-bootstrap';

export default function CommentInput({ index, arrayHelpers }) {
    return (
        <Row>
            <Col xs={10}>    
                <Field 
                    name={`comments.${index}`} as="textarea" placeholder={`Comment #${index+1}`} 
                />
            </Col>
            <Col xs={2}>
                <Button onClick={() => arrayHelpers.remove(index)}>-</Button>
            </Col>
        </Row>
    )
}