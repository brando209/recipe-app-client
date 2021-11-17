import React from 'react';
import { FieldArray } from 'formik';
import { Row, Col, Button } from 'react-bootstrap';

export default function InputList({ name, label, listItems, renderItem, initialItemValue }) {
    return (
        <FieldArray
            name={name}
            render={arrayHelpers => (
                <>
                    <Row>
                        <Col xs={6}>
                            <label htmlFor={name}>{label}</label>
                        </Col>
                        <Col xs={6}>
                            <Button
                                type="button"
                                size="sm"
                                onClick={() => arrayHelpers.push(initialItemValue)}
                            >
                                Add
                            </Button>
                        </Col>
                    </Row>
                    {listItems.map((item, index) => (
                        renderItem(item, index, arrayHelpers)
                    ))}
                </>
            )}
        />
    );
}