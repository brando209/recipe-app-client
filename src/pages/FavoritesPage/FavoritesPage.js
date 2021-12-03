import React from 'react';
import Page from '../Page/Page';
import RecipeCard from '../../components/app/RecipeCard/RecipeCard';
import { useRecipeContext } from '../../contexts/RecipeContext/RecipeContext';
import { Link } from 'react-router-dom';

export default function FavoritesPage(props) {
    const { data: recipes, updateRecipe, loading, error } = useRecipeContext();

    const favoritedRecipes = recipes.filter(recipe => recipe.favorite);

    const handleFavorite = (recipeId, isFavorite) => {
        updateRecipe(recipeId, { favorite: !isFavorite }, () => console.log("toggled favorite"));
    }

    return (
        <Page>
            Favorites page
            {loading && <p>Loading...</p>}
            {error && <pre>{JSON.stringify(error.message, null, 2)}</pre>}
            {!error && !loading && favoritedRecipes.length > 0 && favoritedRecipes.map(recipe => (
                <RecipeCard key={recipe.id} {...recipe} onFavorite={handleFavorite} />
            ))}
            {!error && !loading && favoritedRecipes.length === 0 && 
                <>
                    <p>You currently have no favorited recipes.</p>
                    <p><Link to="/new">Click here</Link> to add a new recipe.</p>
                </>
            }
        </Page>
    )   
}