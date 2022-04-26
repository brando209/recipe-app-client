import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Inputs from '../../input';
import recipeSchema from '../../../utility/validationSchema/recipeSchema';

import LoadingHeart from '../../display/buttons/LoadingHeart/LoadingHeart';
import styled from 'styled-components';

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
                formData.append("serves", values.serves ?? 1);
                formData.append("prepTime", JSON.stringify(values.prepTime));
                formData.append("cookTime", JSON.stringify(values.cookTime));
                formData.append("totalTime", JSON.stringify(values.cookTime));
                formData.append("ingredients", JSON.stringify(values.ingredients));
                formData.append("instructions", JSON.stringify(values.instructions));
                formData.append("comments", JSON.stringify(values.comments));
                formData.append("categories", JSON.stringify(values.categories));
                formData.append("photo", (values.photo?.url ?? values.photo) || "");
                setSubmitting(true);
                onSubmit(formData, () => {
                    setSubmitting(false);
                });
            }}
            validationSchema={recipeSchema}
        >
            {({ isSubmitting, values, setFieldValue }) => (
                <StyledNewRecipeForm>
                    <StyledLoadingHeart
                        type="submit"
                        variant="secondary"
                        isLoading={isSubmitting}
                        disabled={isSubmitting || isImporting}
                        defaultText="Submit" loadingText="Submitting..." 
                    />
                    <Inputs.InputContainer name="title" label="Title">
                        <Field name="title" placeholder="Recipe Title" type="input" className="title-input" />
                    </Inputs.InputContainer>
                    <FormError name="title" component="div" className="form-error-message" />

                    <Inputs.InputContainer name="description" label="Description">
                        <Field name="description" placeholder="Recipe Description" as="textarea" className="description-input" />
                    </Inputs.InputContainer>
                    <FormError name="description" component="div" className="form-error-message" />

                    <Inputs.InputContainer name="prepTime" label="Prep Time">
                        <Field as={Inputs.TimeInput} name="prepTime" id="time-input"/>
                    </Inputs.InputContainer>
                    <FormError name="prepTime" component="div" className="form-error-message" />

                    <Inputs.InputContainer name="cookTime" label="Cook Time">
                        <Field as={Inputs.TimeInput} name="cookTime" id="time-input" />
                    </Inputs.InputContainer>
                    <FormError name="cookTime" component="div" className="form-error-message" />

                    <Inputs.InputContainer name="totalTime" label="Total Time">
                        <Field as={Inputs.TimeInput} name="totalTime" id="time-input" />
                    </Inputs.InputContainer>
                    <FormError name="totalTime" component="div" className="form-error-message" />

                    <Inputs.InputContainer name="serves" label="Serves">
                        <Field name="serves" placeholder="Serves" type="number" min={1} className="serving-input" />
                    </Inputs.InputContainer>
                    <FormError name="serves" component="div" className="form-error-message" />

                    {values.photo && <StyledImage src={values.photo && typeof values.photo === "string" ? values.photo : (values.photo?.url && typeof values.photo?.url === "string" ? values.photo.url : selectedImage)} alt="" />}

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
                    <FormError name="categories" component="div" className="form-error-message" />

                    <Inputs.InputList
                        name="ingredients" label="Ingredients"
                        listItems={values.ingredients}
                        initialItemValue={{ name: "", quantity: "", unit: "", size: "", comment: "" }}
                        renderItem={(item, index, arrayHelpers) => <Inputs.IngredientInput key={`ingredient-${index}`} item={item} index={index} arrayHelpers={arrayHelpers} />}
                    />
                    <FormError name="ingredients" component="div" className="form-error-message" />

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
                    <FormError name="instructions" component="div" className="form-error-message" />

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

                    <StyledLoadingHeart
                        type="submit"
                        variant="secondary"
                        isLoading={isSubmitting}
                        disabled={isSubmitting || isImporting}
                        defaultText="Submit" loadingText="Submitting..." 
                    />
                </StyledNewRecipeForm>
            )}
        </Formik>
    )
}

const StyledLoadingHeart = styled(LoadingHeart)``;

const StyledImage = styled.img`
    width: 100%;
    min-height: 150px;
    max-height: 12rem;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    object-position: center;
    border-radius: 5px;
    border: 2px solid ${(props) => props.theme.main};
    margin: 0 auto;
`

const StyledNewRecipeForm = styled(Form)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 auto;
    width: 100%;

    >:nth-child(n) {
        width: 100%;
    }

    .title-input, .description-input {
        max-width: 500px;
    }
    .serving-input {
        max-width: 350px;
    }

    @media (min-width: 428px) {
        width: 95%; 

        #time-input {
            justify-content: flex-start;
        }

        ${StyledImage} {
            margin: 0;
            margin-left: auto;
            width: 70%;
        }
    }

    @media (min-width: 768px) {
        width: 90%; 
    }

    @media (min-width: 1024px) {
        width: 70%;
    }

    ${StyledLoadingHeart} {
        margin: 0.25rem auto;
        width: initial;
    }
`
const FormError = styled(ErrorMessage)`
    color: red;
`