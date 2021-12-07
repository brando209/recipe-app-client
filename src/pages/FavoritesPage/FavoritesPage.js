import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import Page from '../Page/Page';
import RecipeCard from '../../components/app/RecipeCard/RecipeCard';
import { useRecipeContext } from '../../contexts/RecipeContext/RecipeContext';

export default function FavoritesPage(props) {
    const { data: recipes, updateRecipe, loading, error } = useRecipeContext();

    const favoritedRecipes = recipes?.filter(recipe => recipe.favorite);

    const handleFavorite = (recipeId, isFavorite) => {
        updateRecipe(recipeId, { favorite: !isFavorite });
    }

    return (
        <Page>
            <h1>Favorites</h1>
            {loading && <p>Loading...</p>}
            {error && <pre>{JSON.stringify(error.message, null, 2)}</pre>}
            {!error && !loading && favoritedRecipes.length > 0 && 
                <Row>
                    {favoritedRecipes.map(recipe => (
                        <Col sm="12" md="6" key={recipe.id} className="recipe-card-container"><RecipeCard {...recipe} onFavorite={handleFavorite} /></Col>
                    ))}
                </Row>
            }
            {!error && !loading && favoritedRecipes.length === 0 && 
                <>
                    <p>You currently have no favorited recipes.</p>
                    <p><Link to="/new">Click here</Link> to add a new recipe.</p>
                </>
            }
        </Page>
    )   
}