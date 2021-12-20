import React from 'react';
import { Navigate, useParams } from 'react-router';
import Page from '../Page/Page';
import RecipeDetails from '../../components/app/RecipeDetails/RecipeDetails';
import { useRecipeContext } from '../../contexts/RecipeContext/RecipeContext';

export default function RecipePage(props) {
    const { data: recipes, updateRecipe, deleteRecipe, loading, error } = useRecipeContext();
    const { recipeId } = useParams();

    const recipe = recipes && recipes?.find(rec => rec.id === Number(recipeId));

    const handleFavorite = (recipeId, isFavorite) => {
        updateRecipe(recipeId, { favorite: !isFavorite });
    }

    const handleDelete = (recipeId, callback) => {
        deleteRecipe(recipeId, callback);
    }

    if(!recipe) {
        return <Navigate replace to="/" />
    }

    return (
        <Page>
            {loading && <div>Loading...</div>}
            {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
            {!loading && !error && <RecipeDetails recipe={recipe} onFavorite={handleFavorite} onDelete={handleDelete} />}
        </Page>
    )
}