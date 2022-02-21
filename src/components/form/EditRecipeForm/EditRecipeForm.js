import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { Save, XSquare } from 'react-bootstrap-icons';

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
        for (let ingredient of initialValues.ingredients) {
            //If ingredient is removed set to null
            if (values.ingredients.findIndex(ing => ing.id === ingredient.id) === -1) {
                ingredientsObject[ingredient.name] = null;
            }
        }

        for (let ingredient of values.ingredients) {
            if (ingredient.id) delete ingredient.id;
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
            {({ isSubmitting, values, handleSubmit }) => (
                <StyledEditRecipeForm>
                    <EditRecipeFormTop>
                        <div>
                            <Field name="title" placeholder="Recipe Title" type="input" />
                        </div>
                        <div>
                            <Save onClick={isSubmitting ? null : handleSubmit} />
                            <XSquare onClick={handleCancel} />
                        </div>
                    </EditRecipeFormTop>

                    <EditRecipeFormMiddle>
                        <img src={values.photo.path ? `/${values.photo.path}` : ""} alt="" />
                        <div>
                            <p>
                                <label>Serves:&nbsp;</label>
                                <Field name="serves" placeholder="Serves" type="number" min={1} />
                            </p>
                            <p>
                                <label>Prep&nbsp;Time:&nbsp;</label>
                                <Field name="prep.time" type="number" min={1} />
                                <Field name="prep.unit" as={SelectInput} options={['min', 'hr']} variant="secondary" />
                            </p>
                            <p>
                                <label>Cook&nbsp;Time:&nbsp;</label>
                                <Field name="cook.time" type="number" min={1} />
                                <Field name="cook.unit" as={SelectInput} options={['min', 'hr']} variant="secondary" />
                            </p>
                            <p>
                                <label>Total&nbsp;Time:&nbsp;</label>
                                {(values.prep.time + values.cook.time)}&nbsp;{values.cook.unit}</p>
                        </div>
                        <Field name="description" placeholder="Recipe Description" as="textarea" rows="4" />
                    </EditRecipeFormMiddle>

                    <EditRecipeFormBottom>
                        <InputList
                            name="categories" label="Categories"
                            listItems={values.categories}
                            initialItemValue={{ name: "", type: "" }}
                            renderItem={(item, index, arrayHelpers) => <CategoryInput key={`category-${index}`} item={item} index={index} arrayHelpers={arrayHelpers} />}
                        />

                        <InputList
                            name="ingredients" label="Ingredients"
                            listItems={values.ingredients}
                            initialItemValue={{ name: "", quantity: "", unit: "", size: "", comment: "" }}
                            renderItem={(item, index, arrayHelpers) => <IngredientInput key={`ingredient-${index}`} item={item} index={index} arrayHelpers={arrayHelpers} />}
                        />

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

                        <InputList
                            name="comments" label="Comments"
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
                    </EditRecipeFormBottom>
                </StyledEditRecipeForm>
            )}
        </Formik>
    )
}

const StyledEditRecipeForm = styled(Form)`
    display: flex;
    flex-direction: column;
    margin: 1rem auto;
`

const EditRecipeFormTop = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    > div {
        display: flex;
        flex-direction: row;
        justify-content: flex-end; 
        align-items: flex-start;
        margin-right: 1rem;
        gap: 1rem;

        > input {
            width: 100%;
        }

        > svg {
            min-height: 1.5rem;
            min-width: 1.5rem;
        }

        > svg:hover {
            cursor: pointer;
        }

        > svg:first-child {
            color: green;
        }

        > svg:last-child {
            color: var(--color-red);
        }
    }
    
    @media (min-width: 428px) {
        > div:first-child {
            flex: 0.7;
        }   
    }
`

const EditRecipeFormMiddle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;

    input, select {
        width: 80%;
    }

    textarea {
        width: 95%;
        margin: 0.25rem auto;
    }

    > img {
        width: 100%;
        min-height: 150px;
        max-height: 12rem;
        aspect-ratio: 1 / 1;
        object-fit: cover;
        object-position: center;
        border-radius: 5px;
        margin: 0.25rem;
        border: 2px solid var(--color-red);
    }

    > div {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        flex-wrap: wrap;
        width: 100%;
        
        > p {
            flex: 1;
            margin: 0.25rem;
            padding: 0.25rem 0;
            border: 2px solid var(--color-red);
            border-radius: 5px;
            font-weight: 200;
            background-color: var(--color-white);

            > label {
                font-weight: 400;
                display: inline;
            }
        }
    }
`
const EditRecipeFormBottom = styled.div`

`