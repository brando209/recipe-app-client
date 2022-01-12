import React from 'react';
import { useNavigate } from 'react-router';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import { SelectInput, InputList, IngredientInput, TextareaListInput, CategoryInput } from '../../input';

export default function EditRecipeForm({ recipe, onEdit }) {
    const navigate = useNavigate();
    const { id, favorite, ...initialValues } = recipe;

    const handleCancel = () => {
        navigate(-1);
    }

    const handleSubmit = (values) => {
        //Convert ingredients array to object before submitting
        //TODO: This would best be done within context to keep business logic seperate from components.
        //however we need initial values for ingredients and categories to determine if any have been removed
        const ingredientsObject = {};
        const categoriesObject = {};

        //Look thru initialValues.ingredients to determine which ingredients have been removed
        for(let ingredient of initialValues.ingredients) {
            //If ingredient is removed set to null
            if(values.ingredients.findIndex(ing => ing.id === ingredient.id) === -1) {
                ingredientsObject[ingredient.name] = null;
            }
        }

        for(let ingredient of values.ingredients) {
            if(ingredient.id) delete ingredient.id;
            const { name, ...ingredientValues } = ingredient;
            ingredientsObject[name] = ingredientValues;
        }

        //Look thru initialValues.categories to determine which categories have been removed
        for (let category of initialValues.categories) {
            //If category is removed set to null
            if (values.categories.findIndex(cat => cat.name === category.name) === -1) {
                categoriesObject[category.name] = null;
            }
        }

        for (let category of values.categories) {
            if (category.id) delete category.id;
            const { name, type } = category;
            categoriesObject[name] = { type };
        }

        onEdit(id, { ...values, ingredients: ingredientsObject, categories: categoriesObject }, () => navigate(-1));
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, values }) => (
                <Form>
                    <Row className="recipe-detail-row">
                        <Col as="h2" xs="7">
                            <Field name="title" placeholder="Recipe Title" type="input" />
                        </Col>
                        <Col xs="4">
                            <ButtonGroup>
                                <Button variant="outline-secondary" onClick={handleCancel}>Cancel</Button>
                                <Button variant="secondary" type="submit" disabled={isSubmitting}>Save</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>

                    <Row className="recipe-detail-row">
                        <Col xs="5">
                            <p>Serves: <Field name="serves" placeholder="Serves" type="number"  min={1} /></p>
                            <p>Prep Time:
                                <Field name="prep.time" type="number"  min={1} />
                                <Field name="prep.unit" as={SelectInput} options={['min', 'hr']} variant="secondary" />
                            </p>
                            <p>Cook Time:
                                <Field name="cook.time" type="number"  min={1} />
                                <Field name="cook.unit" as={SelectInput} options={['min', 'hr']} variant="secondary" />
                            </p>
                        </Col>
                        <Col className="recipe-image-container">
                            <img src={initialValues.photo.path ? `http://localhost:3005/${initialValues.photo.path}` : ""} alt="" />
                        </Col>
                    </Row>

                    <Row className="recipe-detail-row">
                        <Field name="description" placeholder="Recipe Description" as="textarea" />
                    </Row>

                    <Row>
                        <InputList
                            name="categories" label="Categories:"
                            listItems={values.categories}
                            initialItemValue={{ name: "", type: "" }}
                            renderItem={(item, index, arrayHelpers) => <CategoryInput key={`category-${index}`} item={item} index={index} arrayHelpers={arrayHelpers} />}
                        />
                    </Row>

                    <Row>
                        <InputList
                            name="ingredients" label="Ingredients"
                            listItems={values.ingredients}
                            initialItemValue={{ name: "", amount: "", measurement: "", size: "" }}
                            renderItem={(item, index, arrayHelpers) => <IngredientInput key={`ingredient-${index}`} item={item} index={index} arrayHelpers={arrayHelpers} />}
                        />
                    </Row>

                    <Row>
                        <InputList
                            name="instructions" label="Instructions"
                            listItems={values.instructions}
                            initialItemValue=""
                            renderItem={(item, index, arrayHelpers) => (
                                <TextareaListInput
                                    key={`instruction-${index}`}
                                    name="instructions"
                                    placeholder="Instruction"
                                    item={item} index={index} arrayHelpers={arrayHelpers}
                                />
                            )}
                        />
                    </Row>

                    <Row>
                        <InputList
                            name="comments" label="Comments:"
                            listItems={values.comments || []}
                            initialItemValue=""
                            renderItem={(item, index, arrayHelpers) => (
                                <TextareaListInput
                                    key={`comment-${index}`}
                                    name="comments"
                                    placeholder="Comment"
                                    item={item} index={index} arrayHelpers={arrayHelpers}
                                />
                            )}
                        />
                    </Row>
                </Form>
            )}
        </Formik>
    )
}