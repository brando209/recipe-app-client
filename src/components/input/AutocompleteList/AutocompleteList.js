import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FieldArray } from 'formik';
import Autocomplete from '../Autocomplete/Autocomplete';
import './AutocompleteList.css';

function AutocompleteList({ name, listItems, suggestions, onChange }) {
    const handleSubmit = (values) => {
        onChange && onChange(values);
    }

    return (
        <>
            <Autocomplete 
                suggestions={suggestions} 
                placeholder="Enter an ingredient to add to list"
                onSubmit={handleSubmit} 
            />
            <FieldArray
                name={name}
                render={arrayHelpers => (
                    <ul className="autocomplete-list">
                        {listItems.map((item, index) => (
                            <Row as="li" key={index}>
                                <Col xs={1}>
                                    <Button 
                                        size="sm"
                                        variant="outline-secondary" 
                                        onClick={() => {
                                            arrayHelpers.remove(index)
                                        }}>
                                        -
                                    </Button>
                                </Col>
                                <Col> 
                                    {item.name}
                                </Col>
                            </Row>
                        ))}
                    </ul>
                )}
            />
        </>
    )
}

export default AutocompleteList;