import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Inputs from '../../input';
import recipeSchema from '../../../utility/validationSchema/recipeSchema';

import LoadingHeart from '../../display/buttons/LoadingHeart/LoadingHeart';

export default function NewRecipeForm({ onSubmit, initialValues, isImporting }) {
    //This state is used when the user selects an image file from device
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    //When a file is selected, convert file to dataurl for display
    useEffect(() => {
        const fileReader = new FileReader();
        const handleShowImage = (evt) => {
            setSelectedImage(evt.target.result);
        }
        fileReader.addEventListener("load", handleShowImage, false);

        if (selectedFile) fileReader.readAsDataURL(selectedFile);

        return () => fileReader.removeEventListener("load", handleShowImage);
    }, [selectedFile]);

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize={true}
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
                formData.append("categories", JSON.stringify(values.categories));
                formData.append("photo", values.photo || "");
                setSubmitting(true);
                // onSubmit(formData, () => {
                //     setSubmitting(false);
                // });
            }}
            // validationSchema={recipeSchema}
        >
            {({ isSubmitting, values, setFieldValue }) => (
                <Form>
                    <Inputs.InputContainer name="title" label="Title">
                        <Field name="title" placeholder="Recipe Title" type="input" />
                    </Inputs.InputContainer>
                    <ErrorMessage name="title" component="div" className="form-error-message" />

                    <Inputs.InputContainer name="description" label="Description">
                        <Field name="description" placeholder="Recipe Description" as="textarea" />
                    </Inputs.InputContainer>
                    <ErrorMessage name="description" component="div" className="form-error-message" />


                    <Inputs.InputContainer name="serves" label="Serves">
                        <Field name="serves" placeholder="Serves" type="number" min={1} />
                    </Inputs.InputContainer>
                    <ErrorMessage name="serves" component="div" className="form-error-message" />


                    <Inputs.InputContainer name="prep" label="Prep">
                        <Field name="prep.time" type="number" min={1} />
                        <Field name="prep.unit" as={Inputs.SelectInput} options={['min', 'hr']} variant="secondary" />
                    </Inputs.InputContainer>
                    <ErrorMessage name="prep.time" component="div" className="form-error-message" />

                    <Inputs.InputContainer name="cook" label="Cook">
                        <Field name="cook.time" type="number" min={1} />
                        <Field name="cook.unit" as={Inputs.SelectInput} options={['min', 'hr']} variant="secondary" />
                    </Inputs.InputContainer>
                    <ErrorMessage name="cook.time" component="div" className="form-error-message" />

                    {values.photo && <div className='recipe-image-container'>
                        <img src={values.photo && typeof values.photo === "string" ? values.photo : selectedImage} alt="" />
                    </div>}

                    <Inputs.InputContainer name="photo" label="Image">
                        <Field
                            type="file"
                            name="photo"
                            value={undefined}
                            onChange={e => {
                                const file = e.target.files[0];
                                setFieldValue('photo', file);
                                setSelectedFile(file);
                            }}
                        />
                    </Inputs.InputContainer>

                    <Inputs.InputList
                        name="categories" label="Categories"
                        listItems={values.categories}
                        initialItemValue={{ name: "", type: "" }}
                        renderItem={(item, index, arrayHelpers) => <Inputs.CategoryInput key={`category-${index}`} item={item} index={index} arrayHelpers={arrayHelpers} />}
                    />
                    <ErrorMessage name="categories" component="div" className="form-error-message" />

                    <Inputs.InputList
                        name="ingredients" label="Ingredients"
                        listItems={values.ingredients}
                        initialItemValue={{ name: "", amount: "", measurement: "", size: "" }}
                        renderItem={(item, index, arrayHelpers) => <Inputs.IngredientInput key={`ingredient-${index}`} item={item} index={index} arrayHelpers={arrayHelpers} />}
                    />
                    <ErrorMessage name="ingredients" component="div" className="form-error-message" />

                    <Inputs.InputList
                        name="instructions" label="Instructions"
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
                        name="comments" label="Comments"
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

                    <LoadingHeart
                        type="submit"
                        variant="secondary"
                        isLoading={isSubmitting || isImporting} 
                        defaultText="Submit" loadingText="Submitting..." 
                    />
                </Form>
            )}
        </Formik>
    )
}