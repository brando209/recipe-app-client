import React from 'react';
import { useParams } from 'react-router';
import Page from '../Page/Page';
import RecipeDetails from '../../components/app/RecipeDetails/RecipeDetails';
import { useRecipeContext } from '../../contexts/RecipeContext/RecipeContext';

export default function RecipePage(props) {
    const { data: recipes, loading, error } = useRecipeContext();
    const { recipeId } = useParams();

    const recipe = recipes && recipes.find(rec => rec.id === Number(recipeId));

    return (
        <Page>
            {loading && <div>Loading...</div>}
            {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
            {!loading && !error && <RecipeDetails recipe={recipe} />}
        </Page>
    )
}