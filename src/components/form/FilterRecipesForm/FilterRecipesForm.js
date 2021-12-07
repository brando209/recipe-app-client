import React from 'react';
import { Row, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';

import AutocompleteList from '../../input/AutocompleteList/AutocompleteList';
import './FilterRecipesForm.css';

function FilterRecipesForm({ initialFilter, onSubmit, ingredients }) {
    const handleClearFilters = () => {
        onSubmit({
            ingredients: []
        });
    }

    return (
        <Formik
            initialValues={initialFilter}
            onSubmit={(values) => {
                onSubmit({
                    ingredients: values.ingredients
                });
            }}
        >
            {(form) => (
                <Form className="filter-recipes-form">
                    <Row>
                        <h5>Ingredients</h5>
                        <AutocompleteList
                            name="ingredients"
                            suggestions={ingredients}
                            listItems={form.values.ingredients}
                            onChange={(value) => {
                                form.setFieldValue('ingredients', [...form.values.ingredients, value]);
                            }}
                        />
                    </Row>

                    <Row>
                        <Button variant="outline-primary" className="clear-filters-btn" onClick={handleClearFilters}>Clear</Button>
                        <Button className="apply-filters-btn" type="submit">Apply</Button>
                    </Row>

                </Form>
            )}
        </Formik>
    )

}

export default FilterRecipesForm;