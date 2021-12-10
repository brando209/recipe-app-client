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
    categories: [],
    photo: null
}

export default function NewRecipeForm({ onSubmit }) {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
                console.log(values);
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
        >
            {({ isSubmitting, values, setFieldValue }) => (
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