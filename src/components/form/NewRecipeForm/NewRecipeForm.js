import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Inputs from '../../input';
import { Button } from 'react-bootstrap';
import './NewRecipeForm.css';

const initialValues = {
    title: "",
    description: "",
    serves: 1,
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
    categories: []
}

export default function NewRecipeForm({ onSubmit }) {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, form) => {
                form.setSubmitting(true);
                onSubmit(values, () => {
                    form.setSubmitting(false);
                });
            }}
        >
            {({ isSubmitting, values }) => (
                <Form>
                    <Inputs.InputContainer name="title" label="Title:">
                        <Field name="title" placeholder="Recipe Title" type="input" />
                    </Inputs.InputContainer>

                    <Inputs.InputContainer name="description" label="Description:">
                        <Field name="description" placeholder="Recipe Description" as="textarea" />
                    </Inputs.InputContainer>

                    <Inputs.InputContainer name="serves" label="Serves:">
                        <Field name="serves" placeholder="Serves" type="number" />
                    </Inputs.InputContainer>

                    <Inputs.InputContainer name="prep" label="Prep:">
                        <Field name="prep.time" type="number" />
                        <Field name="prep.unit" as={Inputs.SelectInput} options={['min', 'hr']} />
                    </Inputs.InputContainer>

                    <Inputs.InputContainer name="cook" label="Cook:">
                        <Field name="cook.time" type="number" />
                        <Field name="cook.unit" as={Inputs.SelectInput} options={['min', 'hr']} />
                    </Inputs.InputContainer>

                    <Inputs.InputList
                        name="ingredients" label="Ingredients:"
                        listItems={values.ingredients}
                        initialItemValue={{ name: "", amount: "", measurement: "", size: "" }}
                        renderItem={(item, index, arrayHelpers) => <Inputs.IngredientInput key={`ingredient-${index}`} item={item} index={index} arrayHelpers={arrayHelpers} />}
                    />

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

                    <Button type="submit" disabled={isSubmitting}>Submit</Button>
                </Form>
            )}
        </Formik>
    )
}