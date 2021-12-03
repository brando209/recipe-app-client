import React from 'react';
import Page from '../Page/Page';
import RecipeCard from '../../components/app/RecipeCard/RecipeCard';
import { useRecipeContext } from '../../contexts/RecipeContext/RecipeContext';
import { Link } from 'react-router-dom';

export default function HomePage() {
    const { data: recipes, updateRecipe, loading, error } = useRecipeContext();

    const handleFavorite = (recipeId, isFavorite) => {
        updateRecipe(recipeId, { favorite: !isFavorite }, () => console.log("toggled favorite"));
    }

    return (
        <Page>
            Home page
            {loading && <p>Loading...</p>}
            {error && <pre>{JSON.stringify(error.message, null, 2)}</pre>}
            {!error && !loading && recipes.length > 0 && recipes.map(recipe => (
                <RecipeCard key={recipe.id} {...recipe} onFavorite={handleFavorite} />
            ))}
            {!error && !loading && recipes.length === 0 && 
                <>
                    <p>You currently have no saved recipes.</p>
                    <p><Link to="/new">Click here</Link> to add a new recipe.</p>
                </>
            }
        </Page>
    )   
}