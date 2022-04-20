import React from 'react';
import { Row } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import Button from '../../input/Button/Button';

import AutocompleteList from '../../input/AutocompleteList/AutocompleteList';
import './FilterRecipesForm.css';

function FilterRecipesForm({ initialFilter, onSubmit, ingredients, categories }) {
    const handleClearFilters = () => {
        console.log("clearing filters");
        onSubmit({
            ingredients: [],
            categories: []
        });
    }

    return (
        <Formik
            initialValues={initialFilter}
            onSubmit={(values) => {
                onSubmit({
                    ingredients: values.ingredients,
                    categories: values.categories
                });
            }}
        >
            {(form) => (
                <Form className="filter-recipes-form">
                    <Row>
                        <h5>Ingredients</h5>
                        <AutocompleteList
                            name="ingredients"
                            placeholder={"Enter an ingredient to add to list"}
                            suggestions={ingredients}
                            listItems={form.values.ingredients}
                            onChange={(value) => {
                                form.setFieldValue('ingredients', [...form.values.ingredients, value]);
                            }}
                        />
                    </Row>

                    <Row>
                        <h5>Categories</h5>
                        <AutocompleteList
                            name="categories"
                            placeholder={"Enter a category to add to list"}
                            suggestions={categories}
                            listItems={form.values.categories}
                            onChange={(value) => {
                                form.setFieldValue('categories', [...form.values.categories, value]);
                            }}
                        />
                    </Row>

                    <Row>
                        <Button variant="outline-secondary" className="clear-filters-btn" onClick={handleClearFilters}>Clear</Button>
                        <Button variant="secondary" className="apply-filters-btn" type="submit">Apply</Button>
                    </Row>

                </Form>
            )}
        </Formik>
    )

}

export default FilterRecipesForm;