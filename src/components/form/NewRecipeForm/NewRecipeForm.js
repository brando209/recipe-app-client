import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'react-bootstrap';
import * as Inputs from '../../input';
import Heart from '../../display/spinners/Heart/Heart';
import recipeSchema from '../../../utility/validationSchema/recipeSchema';

import './NewRecipeForm.css';

const initialValues = {
    title: "",
    description: "",
    serves: "",
    prep: {
        time: "",
        unit: "min"
    },
    cook: {
        time: "",
        unit: "min"
    },
    ingredients: [],
    instructions: [],
    comments: [],
    categories: [],
    photo: null
}

export default function NewRecipeForm({ onSubmit }) {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
                const formData = new FormData();
                formData.append("title", values.title);
                formData.append("description", values.description);
                formData.append("serves", values.serves);
                formData.append("prep", JSON.stringify(values.prep));
                formData.append("cook", JSON.stringify(values.cook));
                formData.append("ingredients", JSON.stringify(values.ingredients));
                formData.append("instructions", JSON.stringify(values.instructions));
                formData.append("comments", JSON.stringify(values.comments));
                formData.append("photo", values.photo || "");
                setSubmitting(true);
                onSubmit(formData, () => {
                    setSubmitting(false);
                });
            }}
            validationSchema={recipeSchema}
        >
            {({ isSubmitting, values, setFieldValue }) => (
                <Form>
                    <Inputs.InputContainer name="title" label="Title:">
                        <Field name="title" placeholder="Recipe Title" type="input" />
                    </Inputs.InputContainer>
                    <ErrorMessage name="title" component="div" className="form-error-message" />

                    <Inputs.InputContainer name="description" label="Description:">
                        <Field name="description" placeholder="Recipe Description" as="textarea" />
                    </Inputs.InputContainer>
                    <ErrorMessage name="description" component="div" className="form-error-message" />


                    <Inputs.InputContainer name="serves" label="Serves:">
                        <Field name="serves" placeholder="Serves" type="number" min={1} />
                    </Inputs.InputContainer>
                    <ErrorMessage name="serves" component="div" className="form-error-message" />


                    <Inputs.InputContainer name="prep" label="Prep:">
                        <Field name="prep.time" type="number" min={1}/>
                        <Field name="prep.unit" as={Inputs.SelectInput} options={['min', 'hr']} variant="secondary" />
                    </Inputs.InputContainer>
                    <ErrorMessage name="prep.time" component="div" className="form-error-message" />

                    <Inputs.InputContainer name="cook" label="Cook:">
                        <Field name="cook.time" type="number" min={1}/>
                        <Field name="cook.unit" as={Inputs.SelectInput} options={['min', 'hr']} variant="secondary"/>
                    </Inputs.InputContainer>
                    <ErrorMessage name="cook.time" component="div" className="form-error-message" />


                    <Inputs.InputContainer name="photo" label="Image:">
                        <Field
                            type="file"
                            name="photo"
                            value={undefined}
                            onChange={e => {
                                const file = e.target.files[0];
                                setFieldValue('photo', file);
                            }}
                        />
                    </Inputs.InputContainer>

                    <Inputs.InputList
                        name="ingredients" label="Ingredients:"
                        listItems={values.ingredients}
                        initialItemValue={{ name: "", amount: "", measurement: "", size: "" }}
                        renderItem={(item, index, arrayHelpers) => <Inputs.IngredientInput key={`ingredient-${index}`} item={item} index={index} arrayHelpers={arrayHelpers} />}
                    />
                    <ErrorMessage name="ingredients" component="div" className="form-error-message" />

                    <Inputs.InputList
                        name="instructions" label="Instructions:"
                        listItems={values.instructions}
                        initialItemValue=""
                        renderItem={(item, index, arrayHelpers) => (
                            <Inputs.TextareaListInput
                                key={`instruction-${index}`}
                                name="instructions"
                                placeholder="Instruction"
                                item={item} index={index} arrayHelpers={arrayHelpers}
                            />
                        )}
                    />
                    <ErrorMessage name="instructions" component="div" className="form-error-message" />


                    <Inputs.InputList
                        name="comments" label="Comments:"
                        listItems={values.comments}
                        initialItemValue=""
                        renderItem={(item, index, arrayHelpers) => (
                            <Inputs.TextareaListInput
                                key={`comment-${index}`}
                                name="comments"
                                placeholder="Comment"
                                item={item} index={index} arrayHelpers={arrayHelpers}
                            />
                        )}
                    />

                    <Button type="submit" disabled={isSubmitting} variant="secondary">
                        {isSubmitting ? 
                            <div>
                                <Heart />
                                <div>Submitting...</div>
                            </div>
                        : "Submit"
                        }
                    </Button>
                </Form>
            )}
        </Formik>
    )
}