import React from 'react';
import { FieldArray } from 'formik';
import { Row, Col, Button } from 'react-bootstrap';

import "./InputList.css";

export default function InputList({ name, label, listItems, renderItem, initialItemValue }) {
    return (
        <FieldArray
            name={name}
            render={arrayHelpers => (
                <div className="input-list">
                    <Row>
                        <Col xs={6}>
                            <label htmlFor={name}>{label}</label>
                        </Col>
                        <Col xs={6}>
                            <Button
                                type="button"
                                size="sm"
                                variant="secondary"
                                onClick={() => arrayHelpers.push(initialItemValue)}
                            >
                                Add
                            </Button>
                        </Col>
                    </Row>
                    {listItems.map((item, index) => (
                        renderItem(item, index, arrayHelpers)
                    ))}
                </div>
            )}
        />
    );
}