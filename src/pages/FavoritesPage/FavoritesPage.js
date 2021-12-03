import React from 'react';
import Page from '../Page/Page';
import RecipeCard from '../../components/app/RecipeCard/RecipeCard';
import { useRecipeContext } from '../../contexts/RecipeContext/RecipeContext';

export default function FavoritesPage(props) {
    const { data: recipes, loading, error } = useRecipeContext();

    const favoritedRecipes = recipes.filter(recipe => recipe.favorite);

    return (
        <Page>
            Favorites page
            {loading && <p>Loading...</p>}
            {error && <pre>{JSON.stringify(error.message, null, 2)}</pre>}
            {!error && !loading && favoritedRecipes.map(recipe => (
                <RecipeCard key={recipe.id} {...recipe} />
            ))}
        </Page>
    )   
}