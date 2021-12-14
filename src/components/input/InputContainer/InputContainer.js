import React from 'react';
import { ErrorMessage } from 'formik';
import { Row, Col } from 'react-bootstrap';
import './InputContainer.css';

export default function InputContainer({ name, label, children }) {
    return (
        <Row className="input-container">
            <Col xs={3}>
                <label htmlFor={name}>{label}</label>
            </Col>
            { children.length ? 
                children.map((child, index) => <Col key={index} className="mx-2">{child}</Col>) : 
                <Col className="mx-2">{children}</Col>
            }
        </Row>
    );
}