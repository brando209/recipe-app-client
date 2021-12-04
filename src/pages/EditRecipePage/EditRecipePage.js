import React from 'react';
import { Navigate, useParams } from 'react-router';
import Page from '../Page/Page';
import EditRecipeForm from '../../components/form/EditRecipeForm/EditRecipeForm';
import { useRecipeContext } from '../../contexts/RecipeContext/RecipeContext';

export default function EditRecipePage(props) {
    const { data: recipes, updateRecipe, loading, error } = useRecipeContext();
    const { recipeId } = useParams();

    const recipe = recipes && recipes?.find(rec => rec.id === Number(recipeId));

    const handleEdit = (recipeId, newValues, callback) => {
        updateRecipe(recipeId, newValues, callback);
    }

    if(!recipe) {
        return <Navigate replace to="/" />
    }

    return (
        <Page>
            {loading && <div>Loading...</div>}
            {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
            {!loading && !error && <EditRecipeForm recipe={recipe} onEdit={handleEdit} />}
        </Page>
    )
}